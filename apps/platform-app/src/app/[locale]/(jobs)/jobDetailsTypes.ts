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
  minBudgetForProjectRealisation: number | null
  maxBudgetForProjectRealisation: number | null
  contractType: DropdownOption
  employmentType: EmploymentType[]
  employmentMode: DropdownOption[]
  country: string
  city: string
  state: PublishingState
  remoteOnly: boolean
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
// - Umowa: B2B / Umowa o pracę / Umowa o dzieło / Umowa Zlecenie
// - Contract: B2B / Employment contract / Contract for specific work / Contract of mandate
export enum JobContractType {
  B2B = 'B2B',
  EMPLOYMENT_CONTRACT = 'employment_contract',
  CONTRACT_FOR_SPECIFIC_WORK = 'contract_for_specific_work',
  CONTRACT_OF_MANDATE = 'contract_of_mandate',
}

