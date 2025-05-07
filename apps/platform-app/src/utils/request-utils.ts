// This file is now deprecated.
// Please use:
// - getClientIp() from ./getClientIp.ts
// - getUserIdentifier() and getUserId() from ./getUserIdentifier.ts

import { headers } from 'next/headers'

/**
 * Gets the client IP address from the request headers
 * Falls back to a placeholder value if not available
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers()

  // Try common headers for IP addresses
  const forwardedFor = headersList.get('x-forwarded-for')
  if (forwardedFor) {
    // Get the first IP in the list (closest to the client)
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = headersList.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Custom header if we're using a proxy
  const cfIp = headersList.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp
  }

  // Fall back to a placeholder when testing locally or IP is unknown
  return 'unknown-ip'
}

/**
 * Generate a user identifier for rate limiting that combines IP and optional user ID
 * @param userId Optional user ID for authenticated users
 * @returns Combined identifier string
 */
export async function getUserIdentifier(
  userId?: string | null,
): Promise<string> {
  const ip = await getClientIp()
  return userId ? `${ip}:${userId}` : ip
}
