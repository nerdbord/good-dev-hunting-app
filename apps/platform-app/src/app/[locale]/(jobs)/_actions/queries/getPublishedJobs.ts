'use server'

import { getPublishedJobs } from '@/backend/job/job.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'
import { createJobModel } from '../../_models/job.model'

export const findPublishedJobs = cache(
  withSentry(async () => {
    const jobs = await getPublishedJobs()
    return jobs.map(createJobModel)
  }),
)
