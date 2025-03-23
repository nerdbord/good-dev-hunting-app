import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions/queries/findAllApprovedProfiles'
import groqService from '@/lib/groq.service'
import { findJobById } from '../_actions/queries/getJobById'
import { matchJobWithProfiles } from './matchJobWithProfiles'
import { notifyMatchedProfiles } from './notifyMatchedProfiles'

// System prompt for job verification
const VERIFICATION_PROMPT = `
You are an AI assistant specialized in verifying job postings.
Your task is to analyze the provided job posting and determine if it meets the quality standards for publication.

A job posting should:
1. Have a clear and descriptive title
2. Include a detailed project brief/description
3. Specify required technologies/skills
4. Include budget information
5. Specify employment details (contract type, work time, work mode, location)
6. Not contain inappropriate content, spam, or scams
7. Be written in a professional manner

Return a JSON object with:
- isValid: boolean indicating if the job posting meets the standards
- reasons: array of strings explaining why the job posting was rejected (if isValid is false)
- suggestions: array of strings with suggestions for improving the job posting
`

interface VerificationResult {
  isValid: boolean
  reasons: string[]
  suggestions: string[]
}

export async function verifyJob(jobId: string): Promise<VerificationResult> {
  try {
    // Get the job details
    const job = await findJobById(jobId)

    // Prepare the job data for the LLM
    const jobData = {
      title: job.jobName,
      description: job.projectBrief,
      technologies: job.techStack.map((tech) => tech.name),
      budget: {
        type: job.budgetType,
        currency: job.currency,
        min: job.minBudgetForProjectRealisation,
        max: job.maxBudgetForProjectRealisation,
      },
      employmentTypes: job.employmentTypes,
      employmentModes: job.employmentModes,
      location: {
        country: job.country,
        city: job.city,
        remoteOnly: job.remoteOnly,
      },
    }

    console.log('jobData', jobData)

    // Prepare the messages for the LLM
    const messages = [
      {
        role: 'system',
        content: VERIFICATION_PROMPT,
      },
      {
        role: 'user',
        content: JSON.stringify(jobData),
      },
    ]

    // Generate the response with JSON format
    const jsonResponse = await groqService.generateResponse(messages, {
      json: true,
      temperature: 0, // Lower temperature for more consistent verification
      maxTokens: 1000,
    })

    // Parse the JSON response
    const verificationResult = JSON.parse(jsonResponse) as VerificationResult

    return verificationResult
  } catch (error) {
    console.error('Error verifying job:', error)
    // Return a default result if verification fails
    return {
      isValid: false,
      reasons: ['An error occurred during verification'],
      suggestions: ['Please try again later'],
    }
  }
}

export async function publishJobWorkflow(jobId: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    // TODO: Disable job verification for now, enable after improvements to verification flow
    // Step 1: Verify the job
    // const verificationResult = await verifyJob(jobId)

    // // If the job is not valid, return the reasons
    // if (!verificationResult.isValid) {
    //     return {
    //         success: false,
    //         message: `Job verification failed: ${verificationResult.reasons.join(
    //             ', ',
    //         )}`,
    //     }
    // }

    // Step 3: Get the published job as a JobModel
    const publishedJob = await findJobById(jobId)

    console.log('publishedJob', publishedJob)

    const publishedProfiles = await findAllApprovedProfiles()

    // Step 4: Find profiles to notify
    const matchingResults = await matchJobWithProfiles(
      publishedJob,
      publishedProfiles,
    )

    console.log('matchingResults', matchingResults)

    // Step 5: Notify matched profiles
    await notifyMatchedProfiles(publishedJob, matchingResults)

    console.log('notifications sent')

    return {
      success: true,
      message: 'Job published successfully and notifications sent',
    }
  } catch (error) {
    console.error('Error in publish job workflow:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
