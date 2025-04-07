import groqService from '@/lib/groq.service'
import { findJobById } from '../_actions/queries/getJobById'

// System prompt for job verification
const VERIFICATION_PROMPT = `
You are an AI-powered moderator responsible for verifying job postings in the AI and IT industry. Your task is to analyze submitted job descriptions and determine whether they meet professional standards for publication. Follow these criteria:

1. **Relevance to AI/IT**
   - The job must be related to artificial intelligence, machine learning, software development, data science, automation, or other IT-related fields.  
   - If the job does not clearly fit these categories, it should be flagged.

2. **Language and Professionalism**
   - The job description must be written in **Polish or English**. Any other language should be flagged.  
   - The description must use appropriate, professional, and respectful language.
   - It must not contain offensive, discriminatory, vulgar, or inappropriate content.

3. **Spam and Nonsense Detection**
   - Identify and reject spam, joke listings, or incoherent job descriptions.
   - Avoid postings that contain meaningless text, excessive repetition, or unrealistic job offers.

4. **Clarity and Completeness**
   - The job posting must provide sufficient details about the position, expectations, and requirements.  
   - If the description is too vague or lacks essential information, it should be flagged.

### Output Format
Respond in JSON format with the following structure:
\`\`\`json
{
  "isValid": boolean,
  "reasons": [
    "Explanation of why the job posting is rejected (if applicable)"
  ],
  "suggestions": [
    "Suggestions for improving the job posting (if applicable)"
  ]
}\`\`\`

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
