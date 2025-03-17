'use server'

import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { getJobById, updateJob } from '@/backend/job/job.service'
import { type Job } from '@/backend/job/job.types'
import { withSentry } from '@/utils/errHandling'

export const updateJobAction = withSentry(
  async (id: string, data: Partial<Job>) => {
    const { user } = await getAuthorizedUser()

    // For anonymous jobs, user can be optional (not logged in)
    const job = await getJobById(id)

    if (!job) {
      throw new Error(`Job with id ${id} not found`)
    }

    // Handle three scenarios:
    // 1. Job is anonymous (no createdById) - anyone can update it
    // 2. Job has an owner and user is logged in as the owner
    // 3. Job has an owner but user is not the owner or not logged in

    if (job.createdById) {
      // If job has an owner, check if user is authorized
      if (!user) {
        throw new Error('User not logged in')
      }

      if (job.createdById !== user.id) {
        throw new Error('You are not authorized to update this job')
      }
    }

    // If job is anonymous or user is the owner, proceed with update
    const updatedJob = await updateJob(id, data)
    return updatedJob
  },
)
