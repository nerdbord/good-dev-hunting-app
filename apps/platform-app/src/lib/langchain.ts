'use server'
import { type AIMessage } from '@langchain/core/messages'
import { ChatGroq } from '@langchain/groq'
import { END, START, StateGraph } from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'

import {
  sendProfileApprovedEmail,
  sendProfileRejectedEmail,
} from '@/backend/mailing/mailing.service'
import { updateProfileById } from '@/backend/profile/profile.service'
import { getUserById } from '@/backend/user/user.service'
import { type UserWithProfileAndGH } from '@/backend/user/user.types'
import { getContextVariable, setContextVariable } from '@langchain/core/context'
import { type BaseMessage } from '@langchain/core/messages'
import { tool } from '@langchain/core/tools'
import { Annotation, type LangGraphRunnableConfig } from '@langchain/langgraph'
import { z } from 'zod'

const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  user: Annotation<UserWithProfileAndGH>(),
})

const evaluationModel = new ChatGroq({
  model: 'llama-3.1-70b-versatile',
  temperature: 0.2,
})

const executionModel = new ChatGroq({
  model: 'llama3-groq-8b-8192-tool-use-preview',
  temperature: 0.1,
})

const acceptProfileTool = tool(
  async (_, config: LangGraphRunnableConfig) => {
    const userId = config.configurable?.userId
    const currentState =
      getContextVariable<typeof StateAnnotation.State>('currentState')

    // updateProfilePublishingState(userId, 'APPROVED')

    if (currentState?.user) {
      if (currentState?.user.profile) {
        updateProfileById(currentState.user.profile.id, { state: 'APPROVED' })
      }

      sendProfileApprovedEmail(
        currentState?.user.email,
        currentState?.user.githubDetails?.username || '',
      )
    }
    return `The profile has been accepted. UserId: ${userId} `
  },
  {
    name: 'accept_profile',
    description: 'Accept user apply and save his profile in our database',
    schema: z.object({}),
  },
)

const rejectProfileTool = tool(
  async (input, config: LangGraphRunnableConfig) => {
    const userId = config.configurable?.userId
    const { reason } = input

    const currentState =
      getContextVariable<typeof StateAnnotation.State>('currentState')

    if (currentState?.user) {
      if (currentState.user.profile) {
        updateProfileById(currentState.user.profile.id, { state: 'REJECTED' })
      }
      sendProfileRejectedEmail(currentState.user.email, reason)
    }

    return `The profile has been rejected. Reason: ${reason}, UserId: ${userId}`
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



const routeMessage = (state: typeof StateAnnotation.State) => {
  const { messages } = state
  const lastMessage = messages[messages.length - 1] as AIMessage
  // If no tools are called, we can finish (respond to the user)
  if (!lastMessage?.tool_calls?.length) {
    return END
  }
  // Otherwise if there is, we continue and call the tools
  return 'tools'
}

async function retrieveProfile(
  state: typeof StateAnnotation.State,
  config: LangGraphRunnableConfig,
) {
  const userId = config.configurable?.userId
  const fetchedUser = await getUserById(userId)

  return { user: fetchedUser }
}

const evaluateProfileByModel = async (state: typeof StateAnnotation.State) => {
  const { profile } = state.user
  const fullName = profile?.fullName || ''
  const bio = profile?.bio || ''

  const responseMessage = await evaluationModel.invoke([
    {
      role: 'system',
      content: `You are an assistant to a recruiter in the IT industry. 
        You will receive a profile containing the candidate’s Name, BIO, and ID.
        Before we send the applicant’s profile to our client, for whom we are seeking specialists, we need to ensure that the submitted applications meet our standards.
        Approve or reject the profile based on the following conditions:
        Conditions:
        '''
        The name contains obscene or offensive words
        A fictitious character’s name is provided
        The BIO contains obscene or offensive words
        The BIO is shorter than 10 words
        The BIO is in a language other than Polish or English
        The BIO contains spelling errors
        The BIO is written in an unprofessional style
        '''
  `,
    },
    {
      role: 'human',
      content: `profile details:
        name: ${fullName}
        bio: ${bio}`,
    },
  ])

  return { messages: [responseMessage] }
}

const executeDecision = async (state: typeof StateAnnotation.State) => {
  const { messages } = state
  const lastMessage = messages[messages.length - 1] as AIMessage

  const modelWithTools = executionModel.bindTools(tools)
  const responseMessage = await modelWithTools.invoke([
    {
      role: 'system',
      content:
        "You are a personal assistant. Based on the user's submitted evaluation, invoke the appropriate tool.",
    },
    { role: 'human', content: lastMessage.content },
  ])
  return { messages: [responseMessage] }
}

const toolNodeWithGraphState = async (state: typeof StateAnnotation.State) => {
  setContextVariable('currentState', state)
  const toolNodeWithConfig = new ToolNode(tools)
  return toolNodeWithConfig.invoke(state)
}

const workflow = new StateGraph(StateAnnotation)
  .addNode('retrieveProfile', retrieveProfile)
  .addNode('evaluateProfile', evaluateProfileByModel)
  .addNode('agent', executeDecision)
  .addNode('tools', toolNodeWithGraphState)
  .addEdge(START, 'retrieveProfile')
  .addEdge('retrieveProfile', 'evaluateProfile')
  .addEdge('evaluateProfile', 'agent')
  .addConditionalEdges('agent', routeMessage)

const graph = workflow.compile()

export const runEvaluateProfileAgent = async (input: any, userId: string) => {
  'use server'
  await graph.invoke(input, {
    configurable: {
      thread_id: '1',
      userId,
    },
  })
}
