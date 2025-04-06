import { cleanupAnonymousJobs } from '@/backend/job/job.service'
import { NextResponse } from 'next/server'

// Explicitly mark this route as dynamic and not eligible for static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * This endpoint is designed to be called by a scheduled job (like Vercel Cron)
 * It cleans up anonymous job listings (those without a user association) that are older than 7 days
 * Default schedule: Run daily
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

    // Delete anonymous jobs older than 7 days
    const result = await cleanupAnonymousJobs(7)

    return NextResponse.json({
      success: true,
      message: 'Anonymous job listings cleaned up successfully',
      deletedCount: result.count,
    })
  } catch (error) {
    console.error('Error cleaning up anonymous jobs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clean up anonymous jobs',
      },
      { status: 500 },
    )
  }
}
