import { SystemMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts'

const systemMessage = new SystemMessage(
  `You are a helpful assistant. Based on the evaluation submitted by the user, invoke the tool to accept or reject the given profile.`,
)

const humanMessage = HumanMessagePromptTemplate.fromTemplate(`{evaluation}`)

export const executeDecisionPrompt = ChatPromptTemplate.fromMessages([
  systemMessage,
  humanMessage,
])
