import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { sendJobProposalEmail } from '@/backend/mailing/mailing.service'
import { getUserLanguage } from '@/backend/user/user.service'
import { type JobModel } from '../_models/job.model'
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
      const userLanguage = await getUserLanguage(profile.userId)

      try {
        // Send job proposal email using the mailing service
        // Convert job to the format expected by sendJobProposalEmail
        const jobData = {
          id: job.id,
          jobName: job.jobName,
          budgetType: job.budgetType,
          minBudgetForProjectRealisation:
            job.minBudgetForProjectRealisation || undefined,
          maxBudgetForProjectRealisation:
            job.maxBudgetForProjectRealisation || undefined,
          currency: job.currency?.toString() || undefined,
          projectBrief: job.projectBrief,
          techStack: job.techStack,
          remoteOnly: job.remoteOnly,
          city: job.city,
          country: job.country,
          employmentTypes: job.employmentTypes,
          employmentModes: job.employmentModes,
        }

        await sendJobProposalEmail({
          job: jobData,
          matchReason,
          profile,
          locale: userLanguage,
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
