'use server'
import { type AIMessage } from '@langchain/core/messages'
import { ChatGroq } from '@langchain/groq'
import { END, START, StateGraph } from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'

import { prisma } from '@/lib/prismaClient'
import { setContextVariable } from '@langchain/core/context'
import { type BaseMessage } from '@langchain/core/messages'
import { Annotation } from '@langchain/langgraph'

async function updateProfilePublishingState(
  profileId: string,
  newState: PublishingState,
) {
  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        state: newState,
      },
    })
    return updatedProfile
  } catch (error) {
    console.error('Błąd podczas aktualizacji statusu profilu:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  profile: Annotation<{ name: string; bio: string }>(),
})

import { tool } from '@langchain/core/tools'
import { type LangGraphRunnableConfig } from '@langchain/langgraph'
import { type PublishingState } from '@prisma/client'
import { z } from 'zod'

const acceptProfileTool = tool(
  async (_, config: LangGraphRunnableConfig) => {
    const profileId = config.configurable?.profileId

    updateProfilePublishingState(profileId, 'APPROVED')

    return `Profil został zaakceptowany i zapisany: ${profileId} `
  },

  {
    name: 'accept_profile',
    description: 'Accept user apply and save his profile in our database',
    schema: z.object({}),
  },
)

const rejectProfileTool = tool(
  async (input, config: LangGraphRunnableConfig) => {
    const { reason } = input
    const profileId = config.configurable?.profileId

    console.log('rejected', profileId, reason) //TODO:

    updateProfilePublishingState(profileId, 'REJECTED')

    return `Profil został odrzucony. Powód: ${reason}`
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

// const evaluationModel = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0,
// });

const evaluationModel = new ChatGroq({
  model: 'llama-3.1-70b-versatile',
  temperature: 0.2,
})

// const executionModel = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0,
// });
const executionModel = new ChatGroq({
  model: 'llama3-groq-8b-8192-tool-use-preview',
  temperature: 0.1,
})

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

const callModel = async (state: typeof StateAnnotation.State) => {
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

const evaluateProfileByModel = async (state: typeof StateAnnotation.State) => {
  const { name, bio } = state.profile

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
        name: ${name}
        bio: ${bio}`,
    },
  ])

  return { messages: [responseMessage] }
}

async function retrieveProfile(
  state: typeof StateAnnotation.State,
  config: LangGraphRunnableConfig,
) {
  const profileId = config.configurable?.profileId

  const fetchedProfile = await fetchProfile(profileId)

  return { profile: fetchedProfile }
}

const fetchProfile = async (profileId: string) => {
  const fetchedProfile = await prisma.profile.findFirst({
    where: {
      id: profileId,
    },
  })

  if (fetchedProfile !== null) {
    const profile = { name: fetchedProfile.fullName, bio: fetchedProfile.bio }
    return profile
  }

  // Handle the case when profileById is null
  return null
}

const toolNodeWithGraphState = async (state: typeof StateAnnotation.State) => {
  // We set a context variable before invoking the tool node and running our tool.
  setContextVariable('currentState', state)
  const toolNodeWithConfig = new ToolNode(tools)
  return toolNodeWithConfig.invoke(state)
}

const workflow = new StateGraph(StateAnnotation)
  .addNode('retrieveProfile', retrieveProfile)
  .addNode('evaluateProfile', evaluateProfileByModel)
  .addNode('agent', callModel)
  .addNode('tools', toolNodeWithGraphState)
  .addEdge(START, 'retrieveProfile')
  .addEdge('retrieveProfile', 'evaluateProfile')
  .addEdge('evaluateProfile', 'agent')
  .addConditionalEdges('agent', routeMessage)

const graph = workflow.compile()

// const inputs = {}
// const config = {
//   configurable: {
//     thread_id: '1',
//     profileId: 'a-user',
//   },
// }

export const runEvaluateProfileAgent = async (
  input: any,
  profileId: string,
) => {
  'use server'
  await graph.invoke(input, {
    configurable: {
      thread_id: '1',
      profileId,
    },
  })
}
