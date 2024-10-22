import { SystemMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts'

const systemMessage =
  new SystemMessage(`You are an assistant to a recruiter in the IT industry. 
      You will receive a profile containing the candidate’s Name, BIO.
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

      Don't worry about the lack of experience in the submitted description; it is provided through another channel.
`)

const humanMessage = HumanMessagePromptTemplate.fromTemplate(`
             Name: {fullName} \n
             BIO: {bio}`)

export const evaluateProfilePrompt = ChatPromptTemplate.fromMessages([
  systemMessage,
  humanMessage,
])
