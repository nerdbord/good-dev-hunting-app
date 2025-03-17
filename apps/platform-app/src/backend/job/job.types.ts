import { type Currency, type PublishingState } from '@prisma/client'

export interface Job {
  id: string
  jobName: string
  projectBrief: string
  budgetType: string
  currency?: Currency | null
  minBudgetForProjectRealisation?: number | null
  maxBudgetForProjectRealisation?: number | null
  contractType: string
  employmentTypes: string[]
  employmentModes: string[]
  country: string
  city: string
  remoteOnly: boolean
  state: PublishingState
  createdById?: string | null
  createdAt: Date
  updatedAt?: Date | null
  terms: boolean
  viewCount: number
}

export interface JobWithRelations extends Job {
  techStack: { id: string; name: string }[]
  createdBy?: {
    id: string
    email: string
    avatarUrl: string | null
  } | null
  applications: { id: string }[]
}
