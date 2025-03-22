'use server'

import { getJobsByUserId } from '@/backend/job/job.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'
import { createJobModel } from '../../_models/job.model'

export const findMyJobs = cache(
  withSentry(async () => {
    const { user } = await getAuthorizedUser()

    if (!user) {
      throw new Error('User not found')
    }

    const jobs = await getJobsByUserId(user.id)
    return jobs.map(createJobModel)
  }),
)
