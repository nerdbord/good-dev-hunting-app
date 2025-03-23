'use server'

import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
import { getJobById, publishJob } from '@/backend/job/job.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import {
  matchJobWithProfiles,
  notifyMatchedProfiles,
  sendJobPublishedEmail,
} from '../../_workflows'
import { claimAnonymousJobAction } from './claimAnonymousJob'

export const publishJobAction = withSentry(async (id: string) => {
  const { user } = await getAuthorizedUser()

  if (!user) {
    throw new Error('User not found')
  }

  console.log('publishJobAction', id)

  // Check if the job exists
  const job = await getJobById(id)

  console.log('job', job)

  if (!job) {
    throw new Error(`Job with id ${id} not found`)
  }

  // If job is anonymous (no createdById), claim it first
  if (!job.createdById) {
    console.log('claiming anonymous job')
    await claimAnonymousJobAction(id)
  }
  // If job is already claimed by someone else, throw an error
  else if (job.createdById !== user.id) {
    console.log('you are not authorized to publish this job')
    throw new Error('You are not authorized to publish this job')
  }

  console.log('publishing job')

  try {
    // TODO: Disable job verification for now, enable after improvements to verification flow
    // Step 1: Verify the job
    // const verificationResult = await verifyJob(jobId)

    // // If the job is not valid, return the reasons
    // if (!verificationResult.isValid) {
    //     return {
    //         success: false,
    //         message: `Job verification failed: ${verificationResult.reasons.join(
    //             ', ',
    //         )}`,
    //     }
    // }

    console.log('publishedJob', job)

    const publishedProfiles = await findAllApprovedProfiles()

    // Step 4: Find profiles to notify
    const matchingResults = await matchJobWithProfiles(job, publishedProfiles)

    console.log('matchingResults', matchingResults)

    // Step 5: Notify matched profiles
    const notificationResults = await notifyMatchedProfiles(
      job,
      matchingResults,
    )

    console.log('notifications sent to matched profiles:', notificationResults)

    // Step 6: Publish the job
    await publishJob(id)

    // Get the updated job with full details
    const updatedJob = await getJobById(id)
    if (!updatedJob) {
      return {
        success: false,
        message: `Could not retrieve updated job with id ${id}`,
      }
    }

    // Step 7: Send confirmation email to job owner
    await sendJobPublishedEmail(
      updatedJob,
      user,
      notificationResults.matchedCount,
    )

    console.log('job owner notification sent')

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
