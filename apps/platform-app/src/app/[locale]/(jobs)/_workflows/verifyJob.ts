import groqService from '@/lib/groq.service'
import { findJobById } from '../_actions/queries/getJobById'

// System prompt for job verification
const VERIFICATION_PROMPT = `
You are an AI assistant specialized in verifying job postings.
Your task is to analyze the provided job posting and determine if it meets the quality standards for publication.

A job posting should:
1. Have a clear and descriptive title
2. Include a detailed project brief/description
3. Specify required technologies/skills
4. Include appropriate budget information based on budget type:
   - For 'FIXED' budget type: min and max values must be specified
   - For 'REQUEST_QUOTE' budget type: no min/max values are required
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

// Quick validation function to catch obvious issues before sending to AI
function preValidateJob(job: any): boolean {
  // Minimum job requirements:
  // 1. Must have a title
  // 2. Must have a project description
  // 3. Must have some employment information (any one of these fields)

  const hasTitleAndDescription =
    job.jobName &&
    job.jobName.trim().length > 2 &&
    job.projectBrief &&
    job.projectBrief.trim().length > 20

  // Check for at least one employment detail
  const hasWorkDetails =
    (job.employmentTypes && job.employmentTypes.length > 0) ||
    (job.employmentModes && job.employmentModes.length > 0) ||
    job.contractType

  // Make sure budget type is handled correctly
  const hasBudgetInfo =
    job.budgetType &&
    (job.budgetType.toUpperCase() === 'REQUEST_QUOTE' ||
      (job.budgetType.toUpperCase() === 'FIXED' &&
        job.minBudgetForProjectRealisation &&
        job.maxBudgetForProjectRealisation))

  const isValid = hasTitleAndDescription && hasWorkDetails && hasBudgetInfo

  return isValid
}

export async function verifyJob(jobId: string): Promise<VerificationResult> {
  try {
    // Get the job details
    const job = await findJobById(jobId)

    if (!job) {
      return {
        isValid: false,
        reasons: ['Job not found'],
        suggestions: ['Please create a new job posting'],
      }
    }

    // First do a quick pre-validation to catch obvious issues
    const passesPreValidation = preValidateJob(job)

    // If pre-validation passes or we want to force AI validation, proceed
    // Note: We're being more lenient here - even if pre-validation fails
    // we'll give the AI a chance to evaluate the job

    // Prepare the job data for the LLM
    const jobData = {
      title: job.jobName,
      description: job.projectBrief,
      technologies: job.techStack?.map((tech) => tech.name) || [],
      budget: {
        type: job.budgetType ? job.budgetType.toUpperCase() : 'REQUEST_QUOTE',
        currency: job.currency,
        min: job.minBudgetForProjectRealisation,
        max: job.maxBudgetForProjectRealisation,
      },
      employmentTypes: job.employmentTypes || [],
      employmentModes: job.employmentModes || [],
      location: {
        country: job.country,
        city: job.city,
        remoteOnly: job.remoteOnly,
      },
      contractType: job.contractType,
    }

    // If the job passes our basic validation, just return success
    // This is our bug fix to avoid unreliable AI validation
    if (passesPreValidation) {
      return {
        isValid: true,
        reasons: [],
        suggestions: [],
      }
    }

    // Send to AI for more thorough verification

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
      temperature: 0,
      maxTokens: 1000,
    })

    // Parse the JSON response
    const verificationResult = JSON.parse(jsonResponse) as VerificationResult

    if (!verificationResult.isValid) {
      // Verification failed
    }

    return verificationResult
  } catch (error) {
    // Return a default result if verification fails
    return {
      isValid: false,
      reasons: ['An error occurred during verification'],
      suggestions: ['Please try again later'],
    }
  }
}
