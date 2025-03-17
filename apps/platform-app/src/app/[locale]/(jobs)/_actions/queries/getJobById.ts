'use server'

import { getJobById } from '@/backend/job/job.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'
import { createJobModel } from '../../_models/job.model'

export const findJobById = cache(
  withSentry(async (id: string) => {
    const job = await getJobById(id)

    if (!job) {
      throw new Error(`Job with id ${id} not found`)
    }

    return createJobModel(job)
  }),
)
