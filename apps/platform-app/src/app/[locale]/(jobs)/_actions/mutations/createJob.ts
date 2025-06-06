'use server'

import { createJob } from '@/backend/job/job.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { countries, findCountryByAnyName } from '@/data/countries'
import openaiService, { type Message } from '@/lib/openai.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { createJobModel } from '../../_models/job.model'
import { verifyJobQuery } from '../../_services/job-security.service'
import type { EmploymentDetails, SubmissionFormData } from '../../_utils/schema'
import { convertMessageToJob } from '../../_workflows/prompts/convert-message-to-job'

// Define response type for job creation
export interface JobCreationResponse {
  success: boolean
  job?: ReturnType<typeof createJobModel>
  error?: string
  reasoning?: string
  rateLimited?: boolean
}

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
  async (jobDescription: string): Promise<JobCreationResponse> => {
    try {
      // First, verify that the query is legitimate
      const verificationResponse = await verifyJobQuery(jobDescription)

      console.log('verificationResponse', verificationResponse)

      if (!verificationResponse.isValid) {
        return {
          success: false,
          error: verificationResponse.error || 'Job verification failed',
          reasoning: verificationResponse.reason || 'Job verification failed',
        }
      }

      const technologies = await getTechnologies()
      const mappedTechnologies = technologies.map((t) => t.name)

      // If no input, create empty job
      if (!jobDescription.trim()) {
        const job = await createJobAction({})
        return { success: true, job }
      }

      // Basic server-side validation
      if (jobDescription.trim().length < 10) {
        return {
          success: false,
          error: 'Job description is too short',
          reasoning:
            'Please provide a more detailed job description (at least 10 characters).',
        }
      }

      if (jobDescription.length > 1500) {
        return {
          success: false,
          error: 'Job description is too long',
          reasoning: 'Please limit your job description to 1500 characters.',
        }
      }

      // If there was an error in verification or rate limiting
      if (!verificationResponse.isValid) {
        return {
          success: false,
          error: verificationResponse.error || 'Job verification failed',
          reasoning:
            verificationResponse.reason ||
            'Job verification failed. Please try again.',
          rateLimited: verificationResponse.error?.includes(
            'Too many verification requests',
          ),
        }
      }

      // If the query is valid, proceed with job creation
      // Analyze the message to extract job details
      const messages: Message[] = [
        {
          role: 'user',
          content: convertMessageToJob(
            mappedTechnologies,
            countries.map((c) => c.name_en),
          ),
        },
        {
          role: 'user',
          content: jobDescription,
        },
      ]

      // Generate the response with JSON format
      const jsonResponse = await openaiService.generateResponse(messages, {
        response_format: { type: 'json_object' },
        temperature: 0,
        model: 'gpt-4o',
        max_tokens: 1000,
      })

      // Parse the JSON response
      const analyzedData = JSON.parse(
        jsonResponse,
      ) as Partial<SubmissionFormData>

      const enCountryName = analyzedData.employmentDetails?.country
        ? findCountryByAnyName(analyzedData.employmentDetails?.country)
        : undefined

      const employmentDetails: Partial<EmploymentDetails> = {
        ...(analyzedData.employmentDetails || {}),
        ...(enCountryName !== undefined && { country: enCountryName }),
      }

      const parsedData: Partial<SubmissionFormData> = {
        ...analyzedData,
        ...(Object.keys(employmentDetails).length > 0 && {
          employmentDetails: employmentDetails as EmploymentDetails,
        }),
      }

      // Create a job with the analyzed data (will include user ID if authenticated)
      const job = await createJobAction(parsedData)
      return { success: true, job }
    } catch (error) {
      console.error('Error processing job description:', error)

      // Instead of creating a minimal job as fallback, return error response
      return {
        success: false,
        error: 'Error processing job description',
        reasoning: error instanceof Error ? error.message : String(error),
      }
    }
  },
)
