import { Currency, EmploymentType, PublishingState } from '@prisma/client'
import {
  EmploymentMode,
  JobContractType,
  type CreateJobDetailsFormValues,
} from './types'

export const mockJobDetails: CreateJobDetailsFormValues = {
  jobName: 'Senior Frontend Developer needed for a fintech project',
  projectBrief:
    'We are looking for an experienced Frontend Developer to help us build a modern fintech platform. The project involves working with React, Next.js, and TypeScript.',
  techStack: [
    { name: 'React', value: 'react' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'Next.js', value: 'nextjs' },
    { name: 'Node.js', value: 'nodejs' },
  ],
  // openToRelocation: true,
  currency: Currency.PLN,
  minBudgetForProjectRealisation: 15000,
  maxBudgetForProjectRealisation: 20000,
  contractType: { name: 'B2B', value: JobContractType.B2B },
  employmentType: [EmploymentType.FULL_TIME],
  employmentMode: [EmploymentMode.HYBRID],
  country: 'Poland',
  city: 'Warsaw',
  state: PublishingState.APPROVED,
  remoteOnly: true,
  terms: false,
}
