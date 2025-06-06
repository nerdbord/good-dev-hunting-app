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
import { saveRejectingReason } from '@/backend/profile/rejection.service'
import {
  notifyProfilePublished,
  notifyProfileRejected,
  sendDiscordNotificationToModeratorChannel,
} from '@/lib/discord'
import { analyzeImage } from '@/services/groq.service'
import { getContextVariable, setContextVariable } from '@langchain/core/context'
import { tool } from '@langchain/core/tools'
import { Annotation, type LangGraphRunnableConfig } from '@langchain/langgraph'
import { z } from 'zod'
import { evaluateProfilePrompt } from './prompts/evaluateProfileNode'
import { executeDecisionPrompt } from './prompts/executeDecisionNode'

const StateAnnotation = Annotation.Root({
  profile: Annotation<ProfileWithRelations>(),
  profileEvaluation: Annotation<string>(),
  rejectionReason: Annotation<string>(),
  avatarDescription: Annotation<string>(),
})

const evaluationModel = new ChatGroq({
  model: 'llama-3.3-70b-versatile',
  temperature: 0,
  streaming: false,
})

const executionModel = new ChatGroq({
  model: 'llama-3.3-70b-versatile',
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
    sendProfileApprovedEmail({
      email: currentState.profile.user.email,
      githubUsername: currentState.profile.user.githubDetails?.username || '',
      locale: currentState.profile.user.language,
    })

    // Send structured notification for profile approval
    await notifyProfilePublished({
      id: profileId,
      username: currentState.profile.fullName,
      userId: currentState.profile.userId,
    })

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
    saveRejectingReason(profileId, reason)
    sendProfileRejectedEmail({
      email: currentState.profile.user.email,
      reason,
      locale: currentState.profile.user.language,
    })
    // Send structured notification for profile rejection
    await notifyProfileRejected({
      id: profileId,
      username: currentState.profile.fullName,
      userId: currentState.profile.userId,
      reasons: [reason],
    })

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

const sendForManualVerificationTool = tool(
  async (input, config: LangGraphRunnableConfig) => {
    const { reason } = input
    const profileId = config.configurable?.profileId
    const currentState =
      getContextVariable<typeof StateAnnotation.State>('currentState')
    if (!currentState) {
      throw new Error('currentState not found')
    }

    await sendDiscordNotificationToModeratorChannel(
      `❓❓❓ AI Workflow doesn't know what to do with ${currentState.profile.fullName} profile. ❓❓❓
      Reason: ${reason}
      [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${currentState.profile.userId})`,
    )

    return `Discord notification has been sended. profileId: ${profileId} `
  },
  {
    name: 'send_for_manual_verfication',
    description: 'Send user apply for manual verfication',
    schema: z.object({
      reason: z
        .string()
        .describe('The reason why did you rejected user profile'),
    }),
  },
)

const tools = [
  acceptProfileTool,
  rejectProfileTool,
  sendForManualVerificationTool,
]

async function retrieveProfile(
  state: typeof StateAnnotation.State,
  config: LangGraphRunnableConfig,
) {
  const profileId = config.configurable?.profileId
  const fetchedProfile = await getProfileById(profileId)

  return { profile: fetchedProfile }
}

const describeAvatar = async (state: typeof StateAnnotation.State) => {
  const { user, fullName, userId } = state.profile
  const { avatarUrl } = user

  if (avatarUrl) {
    try {
      const avatarDescription = await analyzeImage(
        avatarUrl,
        `What is on the photo, Describe it in one paragraph`,
      )

      return { avatarDescription }
    } catch (error) {
      console.error('error', error)
      await sendDiscordNotificationToModeratorChannel(
        `❗❗❗ AI Workflow occurred error while evaluating the ${fullName} profile. ${error}
        [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${userId})`,
      )

      throw new Error('AI Workflow occurred error while evaluating the profile')
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

  const modelWithTools = executionModel.bindTools(tools, {
    tool_choice: 'required',
  })

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
  const res = await graph.invoke(
    {},
    {
      configurable: {
        thread_id: profileId,
        profileId,
      },
    },
  )
  return res
}
