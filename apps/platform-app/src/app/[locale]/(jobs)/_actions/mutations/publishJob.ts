'use server'

import { getJobById, publishJob } from '@/backend/job/job.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { publishJobWorkflow } from '../../_workflows/publishJob'
import { claimAnonymousJobAction } from './claimAnonymousJob'

export const publishJobAction = withSentry(async (id: string) => {
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

  // Use the workflow to handle the publication process
  const result = await publishJobWorkflow(id)

  if (!result.success) {
    throw new Error(result.message)
  }

  // Return the updated job
  const updatedJob = await publishJob(id)
  return updatedJob
})
