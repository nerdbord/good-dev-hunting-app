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
import { getContextVariable, setContextVariable } from '@langchain/core/context'
import { tool } from '@langchain/core/tools'
import { Annotation, type LangGraphRunnableConfig } from '@langchain/langgraph'
import { z } from 'zod'
import { evaluateProfilePrompt } from './prompts/evaluateProfileNode'
import { executeDecisionPrompt } from './prompts/executeDecisionNode'

const StateAnnotation = Annotation.Root({
  profile: Annotation<ProfileWithRelations>(),
  evaluation: Annotation<string>(),
})

const evaluationModel = new ChatGroq({
  model: 'llama-3.1-70b-versatile',
  temperature: 0.2,
  streaming: false,
})

const executionModel = new ChatGroq({
  model: 'llama3-groq-8b-8192-tool-use-preview',
  temperature: 0.1,
})

const acceptProfileTool = tool(
  async (_, config: LangGraphRunnableConfig) => {
    const profileId = config.configurable?.profileId
    const currentState =
      getContextVariable<typeof StateAnnotation.State>('currentState')
    if (!currentState) {
      throw new Error('currentState not found')
    }

    updateProfileById(currentState.profile.user.id, { state: 'APPROVED' })
    sendProfileApprovedEmail(
      currentState.profile.user.email,
      currentState.profile.user.githubDetails?.username || '',
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

const evaluateProfileByModel = async (state: typeof StateAnnotation.State) => {
  const { fullName, bio } = state.profile

  const chain = evaluateProfilePrompt.pipe(evaluationModel)
  const responseMessage = await chain.invoke({ fullName, bio })

  return { evaluation: responseMessage.content }
}

const executeDecision = async (state: typeof StateAnnotation.State) => {
  const { evaluation } = state

  const modelWithTools = executionModel.bindTools(tools)
  const chain = executeDecisionPrompt.pipe(modelWithTools)
  const responseMessage = await chain.invoke({ evaluation })

  const messageWithSingleToolCall = new AIMessage({
    content: responseMessage.content,
    tool_calls: responseMessage.tool_calls?.[0]
      ? [responseMessage.tool_calls?.[0]]
      : undefined,
  })

  setContextVariable('currentState', state)
  const toolNode = new ToolNode(tools)
  await toolNode.invoke({ messages: [messageWithSingleToolCall] })
}

const workflow = new StateGraph(StateAnnotation)
  .addNode('retrieveProfile', retrieveProfile)
  .addNode('evaluateProfile', evaluateProfileByModel)
  .addNode('executeDecision', executeDecision)
  .addEdge(START, 'retrieveProfile')
  .addEdge('retrieveProfile', 'evaluateProfile')
  .addEdge('evaluateProfile', 'executeDecision')
  .addEdge('executeDecision', END)

const graph = workflow.compile()

export const runEvaluateProfileAgent = async (profileId: string) => {
  'use server'
  await graph.invoke('', {
    configurable: {
      thread_id: profileId,
      profileId,
    },
  })
}
