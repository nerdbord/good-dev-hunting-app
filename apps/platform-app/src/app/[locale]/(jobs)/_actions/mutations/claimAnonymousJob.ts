'use server'

import { getJobById, updateJob } from '@/backend/job/job.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'

export const claimAnonymousJobAction = withSentry(async (jobId: string) => {
  const { user } = await getAuthorizedUser()

  if (!user) {
    throw new Error('User not found')
  }

  // Check if the job exists
  const job = await getJobById(jobId)

  if (!job) {
    throw new Error(`Job with id ${jobId} not found`)
  }

  // Only claim if it's an anonymous job (no createdById)
  if (!job.createdById) {
    const updatedJob = await updateJob(jobId, {
      createdById: user.id,
    })
    return updatedJob
  }

  // If it's already claimed by someone else, throw an error
  if (job.createdById !== user.id) {
    throw new Error('This job belongs to another user')
  }

  // If it's already claimed by this user, just return it
  return job
})
