import {
  checkAndRecordRateLimit,
  GLOBAL_API_CALLS,
  MAX_API_CALLS_PER_DAY,
} from '@/backend/rate-limit/rate-limit.service'
import groqService from '@/lib/groq.service'
import { getUserId } from '../../../../utils/auth.helpers'
import { getClientIp } from '../../../../utils/request-utils'
import { verifyJobQueryPrompt } from '../_workflows/prompts/verify-job-query'

// Interface for the verification result
export interface JobVerificationResult {
  isValid: boolean
  score: number
  reasoning: string
}

/**
 * Check global API call counter to prevent excessive usage
 * Reset counter daily
 */
function checkGlobalApiLimit(): boolean {
  const now = Date.now()
  const ONE_DAY = 24 * 60 * 60 * 1000

  // Reset counter if a day has passed
  if (now - GLOBAL_API_CALLS.timestamp > ONE_DAY) {
    GLOBAL_API_CALLS.count = 1
    GLOBAL_API_CALLS.timestamp = now
    return false
  }

  // Check if global limit reached
  if (GLOBAL_API_CALLS.count >= MAX_API_CALLS_PER_DAY) {
    return true
  }

  // Increment counter
  GLOBAL_API_CALLS.count++
  return false
}

/**
 * Verifies a job query for security concerns
 */
export async function verifyJobQuery(query: string): Promise<{
  isValid: boolean
  error?: string
  reason?: string
}> {
  // Rate limiting check
  const ipAddress = await getClientIp()
  const userId = await getUserId()

  const rateLimit = await checkAndRecordRateLimit(
    ipAddress,
    'JOB_CREATION',
    userId,
  )

  if (rateLimit.isLimited) {
    return {
      isValid: false,
      error: 'Too many verification requests. Please try again later.',
      reason: `Rate limit for job posting has been reached (max 2 per day).`,
    }
  }

  // Continue with existing verification logic
  try {
    // Check global API rate limit
    if (checkGlobalApiLimit()) {
      return {
        isValid: false,
        error:
          'Service temporarily unavailable due to high demand. Please try again later.',
        reason: 'Service temporarily unavailable due to high demand.',
      }
    }

    // Check if the query is not empty or too short
    if (!query || query.trim().length < 10) {
      return {
        isValid: false,
        error: 'Job description is too short. Please provide more details.',
      }
    }

    // Check if the query is not too long
    if (query.length > 1500) {
      return {
        isValid: false,
        error: 'Job description is too long. Please limit to 1500 characters.',
      }
    }

    // Increment global API usage counter
    GLOBAL_API_CALLS.count++

    // Define the system and user messages
    const messages = [
      {
        role: 'system',
        content: verifyJobQueryPrompt(),
      },
      {
        role: 'user',
        content: query,
      },
    ]

    // Generate response with JSON format
    const jsonResponse = await groqService.generateResponse(messages, {
      json: true,
      temperature: 0, // Use deterministic output
      maxTokens: 500,
    })

    // Parse the response as JSON
    const result = JSON.parse(jsonResponse) as JobVerificationResult

    // Return successful response
    return {
      isValid: result.isValid,
      reason: result.reasoning,
    }
  } catch (error) {
    console.error('[Job Verification Error]', error)

    // Return error response instead of throwing
    return {
      isValid: false,
      error:
        'Error processing your request. Please try again with a clearer job description.',
    }
  }
}
