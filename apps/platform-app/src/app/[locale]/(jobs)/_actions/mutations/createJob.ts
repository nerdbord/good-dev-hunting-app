'use server'

import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { createJob } from '@/backend/job/job.service'
import groqService from '@/lib/groq.service'
import { withSentry } from '@/utils/errHandling'
import { createJobModel } from '../../_models/job.model'
import { type SubmissionFormData } from '../../_utils/groq/schema'
import { convertMessageToJob } from '../../_workflows/prompts/convert-message-to-job'

// Base function to create a job with optional user ID
export const createJobAction = withSentry(
  async (data: Partial<SubmissionFormData>) => {
    // Get authorized user
    const { user } = await getAuthorizedUser()

    // Create job with user ID if available
    const job = await createJob(data, user?.id)
    return createJobModel(job)
  },
)

// Create job from description (used by chat interface)
export const createJobFromDescriptionAction = withSentry(
  async (jobDescription: string) => {
    try {
      // If no input, create empty job
      if (!jobDescription.trim()) {
        return await createJobAction({})
      }

      // Analyze the message to extract job details
      const messages = [
        {
          role: 'system',
          content: convertMessageToJob([]),
        },
        {
          role: 'user',
          content: jobDescription,
        },
      ]

      // Generate the response with JSON format
      const jsonResponse = await groqService.generateResponse(messages, {
        json: true,
        temperature: 0,
        maxTokens: 1000,
      })

      // Parse the JSON response
      const analyzedData = JSON.parse(
        jsonResponse,
      ) as Partial<SubmissionFormData>

      console.log('analyzedData', analyzedData)

      // Create a job with the analyzed data (will include user ID if authenticated)
      return await createJobAction(analyzedData)
    } catch (error) {
      console.error('Error processing job description:', error)
      // Create a minimal job with just the description as fallback
      return await createJobAction({
        taskName: 'Untitled Job',
        projectBrief: jobDescription || '',
        technologies: [],
      })
    }
  },
)
