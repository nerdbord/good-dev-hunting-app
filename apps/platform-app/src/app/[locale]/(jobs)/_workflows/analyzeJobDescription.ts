'use server'
import { getTechnologies } from '@/backend/technology/technology.service'
import groqService from '@/lib/groq.service'
import { type SubmissionFormData } from '../_utils/schema'
import { convertMessageToJob } from './prompts/convert-message-to-job'

export async function analyzeJobDescription(
  description: string,
): Promise<Partial<SubmissionFormData>> {
  const fetchedTechnologies = await getTechnologies()

  const technologies = fetchedTechnologies.map((technology) => technology.name)

  try {
    // Prepare the messages for the LLM
    const messages = [
      {
        role: 'system',
        content: convertMessageToJob(technologies),
      },
      {
        role: 'user',
        content: description,
      },
    ]

    console.log('messages', messages)

    // Generate the response with JSON format
    const jsonResponse = await groqService.generateResponse(messages, {
      json: true,
      temperature: 0, // Lower temperature for more deterministic results
      maxTokens: 2000,
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
      projectBrief: description || '',
      technologies: [],
    }
  }
}
