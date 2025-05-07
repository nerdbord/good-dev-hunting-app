'use server'

import {
  findAllApprovedProfiles,
  findAllTeamProfiles,
} from '@/app/[locale]/(profile)/_actions'
import { getJobById, publishJob, rejectJob } from '@/backend/job/job.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import {
  matchJobWithProfiles,
  notifyMatchedProfiles,
  sendJobPublishedEmail,
  verifyJob,
} from '../../_workflows'
import { claimAnonymousJobAction } from './claimAnonymousJob'

export const publishJobAction = withSentry(async (id: string) => {
  try {
    const { user } = await getAuthorizedUser()

    if (!user) {
      throw new Error('User not found')
    }
    let userLanguage = user.language

    // Check if the job exists
    const job = await getJobById(id)

    if (!job) {
      throw new Error(`Job with id ${id} not found`)
    }

    // If job is anonymous (no createdById), claim it first
    if (!job.createdById) {
      await claimAnonymousJobAction(id)
      // Re-fetch the job after claiming to ensure createdById is set for subsequent checks/steps
      const claimedJob = await getJobById(id)
      if (!claimedJob || !claimedJob.createdById) {
        throw new Error(`Failed to claim job ${id} or fetch updated details.`)
      }
      // Use the claimed job data from now on
      Object.assign(job, claimedJob)
    }
    // If job is already claimed by someone else, throw an error
    else if (job.createdById !== user.id) {
      console.error(
        `[publishJobAction] User ${user.id} attempted to publish job ${id} owned by ${job.createdById}.`,
      )
      throw new Error('You are not authorized to publish this job')
    }

    // Step 1: Verify the job content
    console.log(`[publishJobAction] Step 1: Verifying job ${id}...`)
    const verificationResult = await verifyJob(id)

    // If the job is not valid, set the job state to REJECTED instead of leaving it as DRAFT
    if (!verificationResult.isValid) {
      await rejectJob(id)

      return {
        success: false,
        message: `Job verification failed: ${verificationResult.reasons.join(
          ', ',
        )}`,
        verificationResult,
      }
    }

    console.log('ENABLE_PUBLIC_MATCHING', process.env.ENABLE_PUBLIC_MATCHING)

    const publishedProfiles = process.env.ENABLE_PUBLIC_MATCHING
      ? await findAllApprovedProfiles()
      : await findAllTeamProfiles()

    // Step 2: Find potential candidate matches using AI
    const matchingResults = await matchJobWithProfiles(job, publishedProfiles)

    // Step 3: Notify matched profiles (using the same results)
    const notificationResults = await notifyMatchedProfiles(
      job,
      matchingResults,
    )

    // Step 4: Publish the job (update state to APPROVED)
    await publishJob(id)

    // Step 5: Get the updated job details (needed for email)
    const updatedJobWithRelations = await getJobById(id)
    if (!updatedJobWithRelations) {
      console.error(
        `[publishJobAction] Failed to retrieve updated job ${id} after publishing.`,
      )
      return {
        success: false,
        message: `Critical error: Could not retrieve updated job with id ${id} after publishing.`,
      }
    }

    if (!userLanguage) {
      const { user } = await getAuthorizedUser()
      if (!user) {
        throw new Error('User not found')
      }
      userLanguage = user.language
    }
    // Step 6: Send confirmation email to job owner
    await sendJobPublishedEmail({
      job: updatedJobWithRelations as any,
      matchedProfilesCount: notificationResults.matchedCount,
      user,
      locale: user.language,
    })
    return {
      success: true,
      message:
        'Job published successfully, matches saved, and notifications sent.',
      jobCandidatesAmount: notificationResults.matchedCount,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unknown error occurred during job publication.'
    console.error(
      `[publishJobAction] Error processing job ID ${id}: ${errorMessage}`,
      error,
    )
    return {
      success: false,
      message: errorMessage,
    }
  }
})
