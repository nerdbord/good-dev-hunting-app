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
  budgetType: BudgetType
  currency: Currency
  minBudgetForProjectRealisation: number | null
  maxBudgetForProjectRealisation: number | null
  contractType: {
    name: string
    value: JobContractType
  }
  employmentType: EmploymentType[]
  employmentMode: EmploymentMode[]
  country: string
  city: string
  state: PublishingState
  remoteOnly: boolean
}

export interface CreateJobFormValues extends JobDetailsFormValues {
  terms: boolean
}

export type TechStack = {
  name: string
}[]

export interface BudgetForProjectRealisation {
  minBudgetForProjectRealisation: number | null
  maxBudgetForProjectRealisation: number | null
}

export enum JobContractType {
  B2B = 'B2B',
  EMPLOYMENT_CONTRACT = 'employment_contract',
  CONTRACT_FOR_SPECIFIC_WORK = 'contract_for_specific_work',
  CONTRACT_OF_MANDATE = 'contract_of_mandate',
}

export enum EmploymentMode {
  STATIONARY = 'Stationary',
  HYBRID = 'Hybrid',
  REMOTE = 'Remote',
}

export enum BudgetType {
  FIXED = 'fixed',
  REQUEST_QUOTE = 'requestQuote',
}

export interface LoginFormValues {
  email: string
}
