import { httpClient } from '@/lib/httpClient'

export async function sendDiscordNotificationToWebhook(params: {
  message: string
  webhookUrl: string
  embeds?: any[]
}) {
  try {
    // For now, let's use a simpler approach without embeds
    await httpClient.post(params.webhookUrl, {
      content: params.message,
    })
  } catch (error) {
    console.error('Discord notification error', error)
  }
}

export async function sendDiscordNotificationToModeratorChannel(
  message: string,
) {
  if (!process.env.NEXT_PUBLIC_MODERATION_WEBHOOK) {
    console.error('Moderation webhook not found')
    return
  }

  await sendDiscordNotificationToWebhook({
    message,
    webhookUrl: process.env.NEXT_PUBLIC_MODERATION_WEBHOOK,
  })
}

/**
 * Sends a notification when a new job is published
 */
export async function notifyJobPublished(job: {
  id: string
  title: string
  company?: { name: string } | null
  createdById: string
  matchedProfilesCount?: number
}) {
  const jobUrl = `${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/jobs/${job.id}`
  const companyName = job.company?.name || 'Unknown Company'

  await sendDiscordNotificationToModeratorChannel(
    `🚀 **New Job Published**\n` +
      `**${job.title}**\n` +
      `Published by ${job.createdById} for ${companyName}\n` +
      `Job ID: ${job.id}\n` +
      `Matched Profiles: ${job.matchedProfilesCount || 0}\n` +
      `View job: ${jobUrl}\n` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification when a job fails verification
 */
export async function notifyJobRejected(job: {
  id: string
  title: string
  createdById: string
  reasons: string[]
}) {
  await sendDiscordNotificationToModeratorChannel(
    `❌ **Job Rejected**\n` +
      `**${job.title}**\n` +
      `Job ID: ${job.id} | Created by: ${job.createdById}\n` +
      `Rejection Reasons:\n${
        job.reasons.join('\n') || 'No specific reasons provided'
      }\n` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification when a profile is published
 */
export async function notifyProfilePublished(profile: {
  id: string
  username?: string
  userId: string
}) {
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/p/${
    profile.username || profile.id
  }`

  await sendDiscordNotificationToModeratorChannel(
    `👤 **New Profile Published**\n` +
      `Profile: ${profile.username || 'Unnamed'}\n` +
      `User ID: ${profile.userId}\n` +
      `View profile: ${profileUrl}\n` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification when a profile verification fails
 */
export async function notifyProfileRejected(profile: {
  id: string
  username?: string
  userId: string
  reasons: string[]
}) {
  await sendDiscordNotificationToModeratorChannel(
    `⛔ **Profile Rejected**\n` +
      `Profile: ${profile.username || 'Unnamed'}\n` +
      `User ID: ${profile.userId}\n` +
      `Rejection Reasons:\n${
        profile.reasons.join('\n') || 'No specific reasons provided'
      }\n` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification when a profile verification passes
 */
export async function notifyProfileApproved(profile: {
  id: string
  username?: string
  userId: string
}) {
  await sendDiscordNotificationToModeratorChannel(
    `✅ **Profile Approved**\n` +
      `Profile: ${profile.username || 'Unnamed'}\n` +
      `User ID: ${profile.userId}\n` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification when a new user signs up
 */
export async function notifyNewUserSignup(user: {
  id: string
  email: string
  role: string
}) {
  await sendDiscordNotificationToModeratorChannel(
    `✨ **New User Signup**\n` +
      `User ID: ${user.id}\n` +
      `Email: ${user.email}\n` +
      `Role: ${user.role}\n` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification for system errors that require admin attention
 */
export async function notifySystemError(error: {
  message: string
  source: string
  details?: string
}) {
  await sendDiscordNotificationToModeratorChannel(
    `🔥 **System Error**\n` +
      `Error in ${error.source}\n` +
      `Message: ${error.message}\n` +
      `${error.details ? `Details: ${error.details}\n` : ''}` +
      `Time: ${new Date().toISOString()}`,
  )
}

/**
 * Sends a notification when a user applies for a job
 */
export async function notifyJobApplication(application: {
  id: string
  jobId: string
  jobName?: string
  applicantId: string
  applicantName?: string
  jobOwnerId?: string
}) {
  const jobUrl = `${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/jobs/${application.jobId}`
  const applicantUrl = `${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/p/${application.applicantId}`

  await sendDiscordNotificationToModeratorChannel(
    `📝 **New Job Application**\n` +
      `Application for: ${application.jobName || application.jobId}\n` +
      `Applicant: ${application.applicantName || application.applicantId}\n` +
      `Application ID: ${application.id}\n` +
      `Job Owner: ${application.jobOwnerId || 'Unknown'}\n` +
      `View job: ${jobUrl}\n` +
      `View applicant: ${applicantUrl}\n` +
      `Time: ${new Date().toISOString()}`,
  )
}
