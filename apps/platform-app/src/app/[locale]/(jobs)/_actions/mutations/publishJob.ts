'use server'

import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
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

    // Check if the job exists
    const job = await getJobById(id)

    if (!job) {
      throw new Error(`Job with id ${id} not found`)
    }

    // If job is anonymous (no createdById), claim it first
    if (!job.createdById) {
      await claimAnonymousJobAction(id)
    }
    // If job is already claimed by someone else, throw an error
    else if (job.createdById !== user.id) {
      throw new Error('You are not authorized to publish this job')
    }

    // Step 1: Verify the job
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

    const publishedProfiles = await findAllApprovedProfiles()

    // Step 2: Find profiles to notify
    const matchingResults = await matchJobWithProfiles(job, publishedProfiles)

    // Step 3: Notify matched profiles
    const notificationResults = await notifyMatchedProfiles(
      job,
      matchingResults,
    )

    // Step 4: Publish the job
    await publishJob(id)

    // Step 5: Get the updated job with full details
    const updatedJobWithRelations = await getJobById(id)
    if (!updatedJobWithRelations) {
      return {
        success: false,
        message: `Could not retrieve updated job with id ${id}`,
      }
    }

    // Step 6: Send confirmation email to job owner
    await sendJobPublishedEmail(
      updatedJobWithRelations as any, // Type assertion to resolve the type mismatch
      user,
      notificationResults.matchedCount,
    )

    return {
      success: true,
      message: 'Job published successfully and notifications sent',
    }
  } catch (error) {
    console.error('Error in publish job workflow:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
})
