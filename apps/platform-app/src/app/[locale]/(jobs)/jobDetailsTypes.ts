import { type DropdownOption } from '@gdh/ui-system'
import {
  type Currency,
  type EmploymentType,
  type PublishingState,
} from '@prisma/client'

export type { DropdownOption }

export interface JobDetailsFormValues {
  jobName: string
  projectBrief: string
  techStack: DropdownOption[]
  currency: Currency
  minBudgetForProjectRealisation: number
  maxBudgetForProjectRealisation: number
  contractType: DropdownOption[]
  employmentType: EmploymentType[]
  employmentMode: DropdownOption[]
  country: string
  city: string
  state: PublishingState
}

export interface CreateJobDetailsFormValues extends JobDetailsFormValues {
    terms: boolean
  }

export type TechStack = {
    name: string
  }[]

export interface BudgetForProjectRealisation {
  minBudgetForProjectRealisation: number | null
  maxBudgetForProjectRealisation: number | null
}
