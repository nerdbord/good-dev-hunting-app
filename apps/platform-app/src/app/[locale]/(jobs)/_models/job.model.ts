import { type JobWithRelations } from '@/backend/job/job.types'
import { type Currency, type PublishingState } from '@prisma/client'

export interface JobModel {
  id: string
  jobName: string
  projectBrief: string
  techStack: { id: string; name: string }[]
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
  applications: { id: string }[]
  viewCount: number
  terms: boolean
  // Additional fields from relations
  createdByEmail?: string | null
  createdByAvatarUrl?: string | null
}

export function createJobModel(data: JobWithRelations): JobModel {
  return {
    id: data.id,
    jobName: data.jobName,
    projectBrief: data.projectBrief,
    techStack: data.techStack,
    budgetType: data.budgetType,
    currency: data.currency,
    minBudgetForProjectRealisation: data.minBudgetForProjectRealisation,
    maxBudgetForProjectRealisation: data.maxBudgetForProjectRealisation,
    contractType: data.contractType,
    employmentTypes: data.employmentTypes,
    employmentModes: data.employmentModes,
    country: data.country,
    city: data.city,
    remoteOnly: data.remoteOnly,
    state: data.state,
    createdById: data.createdById,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    applications: data.applications,
    viewCount: data.viewCount,
    terms: data.terms,
    // Additional fields from relations
    createdByEmail: data.createdBy?.email || null,
    createdByAvatarUrl: data.createdBy?.avatarUrl || null,
  }
}
