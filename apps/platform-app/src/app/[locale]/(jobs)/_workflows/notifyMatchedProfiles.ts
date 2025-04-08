import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { MailTemplateId, mailersendClient } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'
import { type JobModel } from '../_models/job.model'
import { BudgetType } from '../_utils/types'
import { type MatchResult } from './matchJobWithProfiles'

export async function notifyMatchedProfiles(
  job: JobModel,
  matchingResults: MatchResult[],
): Promise<{
  matchedCount: number
  sentCount: number
}> {
  try {
    let sentCount = 0

    // Generate and send emails to each matched profile
    for (const { profileId, matchReason } of matchingResults) {
      const profile = await findProfileById(profileId)
      if (!profile) continue

      try {
        // Send email using mailersendClient
        await mailersendClient.sendMail({
          recipients: [new Recipient(profile.email, profile.fullName)],
          templateId: MailTemplateId.jobProposal,
          config: {
            subject: `🤑 We have a new job for you!`,
            fromEmail: 'team@devhunting.co',
            fromName: 'GDH Team',
          },
          personalization: [
            {
              email: profile.email,
              data: {
                job_title: job.jobName,
                budget:
                  job.budgetType === BudgetType.FIXED
                    ? `${job.minBudgetForProjectRealisation} -  ${job.maxBudgetForProjectRealisation} ${job.currency}`
                    : `I need a quote`,
                job_description:
                  job.projectBrief.substring(0, 300) +
                  (job.projectBrief.length > 300 ? '...' : ''),
                job_tech_stack: job.techStack
                  .map((tech) => tech.name)
                  .join(', '),
                job_url: `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job.id}`,
                job_location: job.remoteOnly
                  ? 'Remote'
                  : `${job.city}, ${job.country}`,
                job_employment_types: job.employmentTypes.join(', '),
                job_employment_modes: job.employmentModes.join(', '),
                profile_name: profile.fullName,
                match_reason: matchReason,
                application_url: `${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/jobs/${job.id}/apply`,
                current_year: new Date().getFullYear().toString(),
              },
            },
          ],
        })

        sentCount++
        console.log(`Email sent to ${profile.email} for job ${job.id}`)
      } catch (error) {
        console.error(`Failed to send email to ${profile.email}:`, error)
      }
    }

    return {
      matchedCount: matchingResults.length,
      sentCount,
    }
  } catch (error) {
    console.error('Error notifying matched profiles:', error)
    return {
      matchedCount: 0,
      sentCount: 0,
    }
  }
}
