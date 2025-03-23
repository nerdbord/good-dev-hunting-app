import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'
import { type JobModel } from '../_models/job.model'

// Define the auth user interface based on the session.user structure
interface AuthUser {
  id: string
  email: string
  avatarUrl?: string | null
  name?: string | null
  roles: string[]
  profileId?: string | null
  githubUsername?: string | null
  profileSlug?: string | null
}

/**
 * Sends a confirmation email to the job owner after their job has been published
 * Includes information about how many specialists received the job proposal
 */
export async function sendJobPublishedEmail(
  job: JobModel,
  user: AuthUser,
  matchedProfilesCount: number,
): Promise<boolean> {
  try {
    // Determine the message based on the number of matched profiles
    let matchStatusMessage = ''

    if (matchedProfilesCount === 0) {
      matchStatusMessage =
        "Currently, we don't have specialists that match your job requirements. It may take longer to receive applications, but we'll notify you as soon as we find suitable candidates."
    } else if (matchedProfilesCount === 1) {
      matchStatusMessage = `We've sent your job to 1 specialist who matches your requirements. You should start receiving applications soon.`
    } else {
      matchStatusMessage = `We've sent your job to ${matchedProfilesCount} specialists who match your requirements. You should start receiving applications soon.`
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(user.email, user.name || 'Job Poster')],
      templateId: MailTemplateId.jobPublished,
      config: {
        subject: `Your job "${job.jobName}" has been published!`,
        fromEmail: 'team@devhunting.co',
        fromName: 'Good Dev Hunting Jobs',
      },
      personalization: [
        {
          email: user.email,
          data: {
            recipient_name: user.name || 'there',
            job_title: job.jobName,
            job_url: `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job.id}`,
            matches_status: matchStatusMessage,
            matched_count: matchedProfilesCount.toString(),
            applications_url: `${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/jobs/${job.id}/applications`,
            current_year: new Date().getFullYear().toString(),
          },
        },
      ],
    })

    console.log(
      `Job published confirmation email sent to ${user.email} for job ${job.id}`,
    )
    return true
  } catch (error) {
    console.error('Error sending job published email:', error)
    return false
  }
}
