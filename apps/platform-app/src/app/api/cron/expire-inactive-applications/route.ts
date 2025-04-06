import { expireInactiveApplications } from '@/backend/application/application.service'
import { NextResponse } from 'next/server'

// Explicitly mark this route as dynamic and not eligible for static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * This endpoint is designed to be called by a scheduled job (like Vercel Cron)
 * It expires job applications that have not received a response after 7 days
 * Default schedule: Run daily at midnight
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

    // Expire inactive applications
    const result = await expireInactiveApplications()

    return NextResponse.json({
      success: true,
      message: 'Inactive applications expired successfully',
      expiredCount: result.count,
    })
  } catch (error) {
    console.error('Error expiring inactive applications:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to expire inactive applications',
      },
      { status: 500 },
    )
  }
}
