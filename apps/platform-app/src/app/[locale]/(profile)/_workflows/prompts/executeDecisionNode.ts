import { SystemMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts'

const systemMessage = new SystemMessage(
  `You are a helpful assistant. Invoke tool based on user message`,
)

const humanMessage =
  HumanMessagePromptTemplate.fromTemplate(`{profileEvaluation}`)

export const executeDecisionPrompt = ChatPromptTemplate.fromMessages([
  systemMessage,
  humanMessage,
])
