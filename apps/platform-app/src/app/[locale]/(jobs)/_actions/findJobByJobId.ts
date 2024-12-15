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
      brief: 'We are looking for a Frontend Developer to join our team and help build modern web applications using React and Next.js. The ideal candidate should have strong experience with TypeScript and modern frontend development practices.',
      requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      usersWhoApplied: ["6b5b0853-8c23-4ce0-973e-018df45291bf"],
      salaryRange: '15000 - 20000 PLN',
      scopeOfDuties: [
        'Developing new user-facing features using React.js',
        'Building reusable components and front-end libraries',
        'Translating designs into high-quality code',
        'Optimizing components for maximum performance',
      ],
      requirements: [
        'At least 3 years of experience with React.js',
        'Strong proficiency in TypeScript',
        'Experience with Next.js and server-side rendering',
        'Knowledge of modern front-end build pipelines and tools',
      ],
      benefits: [
        'Flexible working hours',
        'Remote work possible',
        'Private healthcare',
        'Sport card',
        'Learning budget',
      ],
      teamSize: 8,
      numberOfVacancies: 2,
      recruitmentSteps: 3,
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
