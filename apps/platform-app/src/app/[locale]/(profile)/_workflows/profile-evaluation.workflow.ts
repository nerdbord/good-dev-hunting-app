'use server'
import { AIMessage } from '@langchain/core/messages'
import { ChatGroq } from '@langchain/groq'
import { END, START, StateGraph } from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'

import {
  sendProfileApprovedEmail,
  sendProfileRejectedEmail,
} from '@/backend/mailing/mailing.service'
import {
  getProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { type ProfileWithRelations } from '@/backend/profile/profile.types'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { getContextVariable, setContextVariable } from '@langchain/core/context'
import { tool } from '@langchain/core/tools'
import { Annotation, type LangGraphRunnableConfig } from '@langchain/langgraph'
import Groq from 'groq-sdk'
import { z } from 'zod'
import { evaluateProfilePrompt } from './prompts/evaluateProfileNode'
import { executeDecisionPrompt } from './prompts/executeDecisionNode'

const StateAnnotation = Annotation.Root({
  profile: Annotation<ProfileWithRelations>(),
  profileEvaluation: Annotation<string>(),
  avatarDescription: Annotation<string>(),
})

const evaluationModel = new ChatGroq({
  model: 'llama-3.1-70b-versatile',
  temperature: 0,
  streaming: false,
})

const executionModel = new ChatGroq({
  model: 'llama3-groq-70b-8192-tool-use-preview',
  temperature: 0,
})

const acceptProfileTool = tool(
  async (_, config: LangGraphRunnableConfig) => {
    const profileId = config.configurable?.profileId
    const currentState =
      getContextVariable<typeof StateAnnotation.State>('currentState')
    if (!currentState) {
      throw new Error('currentState not found')
    }

    updateProfileById(profileId, { state: 'APPROVED' })
    sendProfileApprovedEmail(
      currentState.profile.user.email,
      currentState.profile.user.githubDetails?.username || '',
    )

    await sendDiscordNotificationToModeratorChannel(
      `✅ AI Workflow has approved ${currentState.profile.fullName} profile. [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${currentState.profile.userId})`,
    )

    return `The profile has been accepted. profileId: ${profileId} `
  },
  {
    name: 'accept_profile',
    description: 'Accept user apply and save his profile in our database',
    schema: z.object({}),
  },
)

const rejectProfileTool = tool(
  async (input, config: LangGraphRunnableConfig) => {
    const profileId = config.configurable?.profileId
    const { reason } = input
    const currentState =
      getContextVariable<typeof StateAnnotation.State>('currentState')
    if (!currentState) {
      throw new Error('currentState not found')
    }

    updateProfileById(profileId, { state: 'REJECTED' })
    sendProfileRejectedEmail(currentState.profile.user.email, reason)
    await sendDiscordNotificationToModeratorChannel(
      `⛔️ AI Workflow has rejected ${currentState.profile.fullName} profile. Reason: ${reason} [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${currentState.profile.userId})`,
    )

    return `The profile has been rejected. Reason: ${reason}, profileId: ${profileId}`
  },
  {
    name: 'reject_profile',
    description: 'Reject user apply and informing him about reason',
    schema: z.object({
      reason: z
        .string()
        .describe('The reason why did you rejected user profile'),
    }),
  },
)

const tools = [acceptProfileTool, rejectProfileTool]

async function retrieveProfile(
  state: typeof StateAnnotation.State,
  config: LangGraphRunnableConfig,
) {
  const profileId = config.configurable?.profileId
  const fetchedProfile = await getProfileById(profileId)

  return { profile: fetchedProfile }
}

const describeAvatar = async (state: typeof StateAnnotation.State) => {
  const { user } = state.profile
  const { avatarUrl } = user

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
  })

  if (avatarUrl) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `What is on the photo, Describe it in one paragraph`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: avatarUrl,
                },
              },
            ],
          },
        ],
        model: 'llama-3.2-90b-vision-preview',
        temperature: 0.5,
        max_tokens: 1024,
        stream: false,
        stop: null,
      })

      return { avatarDescription: chatCompletion.choices[0].message.content }
    } catch (error) {
      console.error('Wystąpił błąd:', error)
    }
  } else {
    return { avatarDescription: `Blank photo` }
  }
}

const evaluateProfileByModel = async (state: typeof StateAnnotation.State) => {
  const { fullName, bio } = state.profile
  const { avatarDescription } = state

  const chain = evaluateProfilePrompt.pipe(evaluationModel)
  const responseMessage = await chain.invoke({
    fullName,
    bio,
    avatarDescription,
  })

  return { profileEvaluation: responseMessage.content }
}

const executeDecision = async (state: typeof StateAnnotation.State) => {
  const { profileEvaluation } = state

  const modelWithTools = executionModel.bindTools(tools)
  const chain = executeDecisionPrompt.pipe(modelWithTools)
  const responseMessage = await chain.invoke({ profileEvaluation })

  const messageWithSingleToolCall = new AIMessage({
    content: responseMessage.content,
    tool_calls: responseMessage.tool_calls?.[0]
      ? [responseMessage.tool_calls?.[0]]
      : undefined,
  })

  setContextVariable('currentState', state)
  const toolNode = new ToolNode(tools)
  await toolNode.invoke({ messages: [messageWithSingleToolCall] })

  return { ...state }
}

const workflow = new StateGraph(StateAnnotation)
  .addNode('retrieveProfile', retrieveProfile)
  .addNode('describeAvatar', describeAvatar)
  .addNode('evaluateProfile', evaluateProfileByModel)
  .addNode('executeDecision', executeDecision)
  .addEdge(START, 'retrieveProfile')
  .addEdge('retrieveProfile', 'describeAvatar')
  .addEdge('describeAvatar', 'evaluateProfile')
  .addEdge('evaluateProfile', 'executeDecision')
  .addEdge('executeDecision', END)

const graph = workflow.compile()

export const runEvaluateProfileAgent = async (profileId: string) => {
  'use server'
  const res = await graph.invoke('', {
    configurable: {
      thread_id: profileId,
      profileId,
    },
  })
  return res
}
