import { prisma } from '@/lib/prismaClient'

// Rate limit configurations
const RATE_LIMITS = {
  JOB_CREATION: {
    maxRequests: 2,
    windowHours: 24,
  },
  JOB_VERIFICATION: {
    maxRequests: 2,
    windowHours: 24, // 1 hour
  },
  API_USAGE: {
    maxRequests: 100,
    windowHours: 24,
  },
}

type RateLimitAction = keyof typeof RATE_LIMITS

/**
 * Checks if a request should be rate limited
 * @param ipAddress The IP address to check
 * @param action The action type (JOB_CREATION, JOB_VERIFICATION, API_USAGE)
 * @param userId Optional user ID for authenticated users
 * @returns A promise that resolves to an object with isLimited and count
 */
export async function checkRateLimit(
  ipAddress: string,
  action: RateLimitAction,
  userId?: string | null,
): Promise<{ isLimited: boolean; remaining: number; resetAt: Date }> {
  // Get rate limit configuration
  const limit = RATE_LIMITS[action]

  // Calculate the start of the time window
  const windowStart = new Date()
  windowStart.setHours(windowStart.getHours() - limit.windowHours)

  // Count existing requests within time window
  const count = await prisma.rateLimit.count({
    where: {
      ipAddress,
      action,
      timestamp: { gte: windowStart },
      ...(userId ? { userId } : {}),
    },
  })

  // Calculate time until reset (end of current window)
  const resetAt = new Date(windowStart)
  resetAt.setHours(resetAt.getHours() + limit.windowHours)

  const remaining = Math.max(0, limit.maxRequests - count)
  const isLimited = count >= limit.maxRequests

  return { isLimited, remaining, resetAt }
}

/**
 * Records a rate-limited action
 * @param ipAddress The IP address making the request
 * @param action The action type
 * @param userId Optional user ID for authenticated users
 * @param metadata Optional additional data as a string (usually JSON)
 * @returns The created RateLimit record
 */
export async function recordRateLimitedAction(
  ipAddress: string,
  action: RateLimitAction,
  userId?: string | null,
  metadata?: string,
) {
  return prisma.rateLimit.create({
    data: {
      ipAddress,
      action,
      userId: userId || undefined,
      metadata,
    },
  })
}

/**
 * Check and record a rate-limited action in a single operation
 * @param ipAddress The IP address making the request
 * @param action The action type
 * @param userId Optional user ID for authenticated users
 * @param metadata Optional additional data
 * @returns Result of rate limit check
 */
export async function checkAndRecordRateLimit(
  ipAddress: string,
  action: RateLimitAction,
  userId?: string | null,
  metadata?: string,
): Promise<{ isLimited: boolean; remaining: number; resetAt: Date }> {
  const result = await checkRateLimit(ipAddress, action, userId)

  // Only record the action if not rate limited
  if (!result.isLimited) {
    await recordRateLimitedAction(ipAddress, action, userId, metadata)
  }

  return result
}

/**
 * Cleans up old rate limit records
 * This can be run periodically via a cron job
 * @param olderThanDays Records older than this many days will be deleted
 */
export async function cleanupRateLimits(olderThanDays = 7) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - olderThanDays)

  return prisma.rateLimit.deleteMany({
    where: {
      timestamp: { lt: cutoff },
    },
  })
}
