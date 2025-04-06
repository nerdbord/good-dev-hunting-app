import { getUsersWithUnreadMessages } from '@/backend/application/application.service'
import {
  sendApplicantUnreadMessagesNotification,
  sendJobOwnerUnreadMessagesNotification,
} from '@/backend/mailing/mailing.service'
import { NextResponse } from 'next/server'

// Explicitly mark this route as dynamic and not eligible for static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * This endpoint is designed to be called by a scheduled job (like Vercel Cron)
 * It sends email notifications to users about their unread messages, separated by role
 * Default schedule: Run daily at a convenient time (e.g., 9 AM)
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

    // Get users with unread messages, separated by role
    const { applicants, jobOwners } = await getUsersWithUnreadMessages()
    const stats = {
      applicants: { total: applicants.length, success: 0, failure: 0 },
      jobOwners: { total: jobOwners.length, success: 0, failure: 0 },
    }

    // Send notifications to each applicant
    for (const user of applicants) {
      try {
        // Only notify if there are actual unread messages
        if (user.unreadCount > 0) {
          const result = await sendApplicantUnreadMessagesNotification(
            user.email,
            user.unreadCount,
            user.username,
          )

          if (result.success) {
            stats.applicants.success++
          } else {
            stats.applicants.failure++
          }
        }
      } catch (err) {
        console.error(
          `Error sending notification to applicant ${user.userId}:`,
          err,
        )
        stats.applicants.failure++
      }
    }

    // Send notifications to each job owner
    for (const user of jobOwners) {
      try {
        // Only notify if there are actual unread messages
        if (user.unreadCount > 0) {
          const result = await sendJobOwnerUnreadMessagesNotification(
            user.email,
            user.unreadCount,
            user.username,
          )

          if (result.success) {
            stats.jobOwners.success++
          } else {
            stats.jobOwners.failure++
          }
        }
      } catch (err) {
        console.error(
          `Error sending notification to job owner ${user.userId}:`,
          err,
        )
        stats.jobOwners.failure++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Unread message notifications sent successfully',
      stats,
    })
  } catch (error) {
    console.error('Error sending unread message notifications:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send unread message notifications',
      },
      { status: 500 },
    )
  }
}
