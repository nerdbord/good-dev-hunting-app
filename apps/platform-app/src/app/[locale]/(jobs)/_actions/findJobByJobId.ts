'use server'

import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'
import type { Job } from '../jobs.types'

export const findJobByJobId = cache(
  withSentry(async (jobId: string) => {
    //NOT IMPLEMENTED YET
    // const job = await getJobByJobId(jobId)

    // return createProfileModel(profile)
    return {
      title: 'Frontend Developer Position',
      brief:
        'We are looking for a Frontend Developer to join our team and help build modern web applications using React and Next.js. The ideal candidate should have strong experience with TypeScript and modern frontend development practices.',
      requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      videocallSlots: [
        new Date(2024, 11, 3), 
        new Date(2024, 11, 7),
        new Date(2024, 11, 11),
        new Date(2024, 11, 15), 
        new Date(2024, 11, 21),
        new Date(2024, 11, 27),
      ],
    } as Job
  }),
)
