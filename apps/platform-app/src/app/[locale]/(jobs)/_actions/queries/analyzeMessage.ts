'use server'

import groqService from '@/lib/groq.service'
import { withSentry } from '@/utils/errHandling'
import type { SubmissionFormData } from '../../_utils/schema'
import { convertMessageToJob } from '../../_workflows/prompts/convert-message-to-job'

export const analyzeMessageAction = withSentry(
  async (message: string): Promise<Partial<SubmissionFormData>> => {
    try {
      // Prepare the messages for the LLM
      const messages = [
        {
          role: 'system',
          content: convertMessageToJob([]),
        },
        {
          role: 'user',
          content: message,
        },
      ]

      // Generate the response with JSON format
      const jsonResponse = await groqService.generateResponse(messages, {
        json: true,
        temperature: 0,
        maxTokens: 1000,
      })

      // Parse the JSON response
      const parsedResponse = JSON.parse(
        jsonResponse,
      ) as Partial<SubmissionFormData>

      return parsedResponse
    } catch (error) {
      console.error('Error analyzing job description:', error)
      // Return a minimal valid object if analysis fails
      return {
        taskName: 'Untitled Job',
        projectBrief: message || '',
        technologies: [],
      }
    }
  },
)
