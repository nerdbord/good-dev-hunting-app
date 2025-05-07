import { expireOldJobs } from '@/backend/job/job.service'
import { NextResponse } from 'next/server'

// Explicitly mark this route as dynamic and not eligible for static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * This endpoint is designed to be called by a scheduled job (like Vercel Cron)
 * It expires job listings that are older than 30 days to keep the job board fresh
 * Default schedule: Run weekly
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

    // Expire jobs older than 30 days
    const result = await expireOldJobs(30)

    return NextResponse.json({
      success: true,
      message: 'Old job listings expired successfully',
      expiredCount: result.count,
    })
  } catch (error) {
    console.error('Error expiring old jobs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to expire old jobs',
      },
      { status: 500 },
    )
  }
}
