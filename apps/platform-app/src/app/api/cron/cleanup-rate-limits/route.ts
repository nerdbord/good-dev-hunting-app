import { cleanupRateLimits } from '@/backend/rate-limit/rate-limit.service'
import { NextResponse } from 'next/server'

// Explicitly mark this route as dynamic and not eligible for static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * This endpoint is designed to be called by a scheduled job (like Vercel Cron)
 * It cleans up old rate limit records to prevent database growth
 * We'll set it to run daily by default, but it can be configured differently
 */
export async function GET(request: Request) {
  try {
    // Verify the request is authorized using CRON_SECRET
    const authHeader = request.headers.get('Authorization')
    const expectedToken = process.env.CRON_SECRET

    // If CRON_SECRET is set, validate against it
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete records older than 7 days
    const result = await cleanupRateLimits(7)

    return NextResponse.json({
      success: true,
      message: 'Rate limit cleanup completed successfully',
      deletedCount: result.count,
    })
  } catch (error) {
    console.error('Error cleaning up rate limits:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clean up rate limits',
      },
      { status: 500 },
    )
  }
}
