import { type DropdownOption } from '@gdh/ui-system'
import { Currency, EmploymentType, PublishingState } from '@prisma/client'
import { type JobModel } from '../_models/job.model'
import {
  BudgetType,
  EmploymentMode,
  JobContractType,
  type CreateJobFormValues,
} from './types'

export const mapJobContract = (contractType: JobContractType): string => {
  switch (contractType) {
    case JobContractType.B2B:
      return 'B2B'
    case JobContractType.EMPLOYMENT_CONTRACT:
      return 'Umowa o pracę'
    case JobContractType.CONTRACT_FOR_SPECIFIC_WORK:
      return 'Umowa o dzieło'
    case JobContractType.CONTRACT_OF_MANDATE:
      return 'Umowa zlecenie'
    default:
      return contractType
  }
}

// If this mapping is not used anywhere else in the application, it can be safely removed once the application is fully operational and confirmed to work without it
export const mappedJobContractType = Object.values(JobContractType).map(
  (contractType) => ({
    name: mapJobContract(contractType),
    value: contractType,
  }),
)

export const mapJobContractType = (
  contractType: string[],
): DropdownOption[] => {
  return contractType.map((contractType) => ({
    name: mapJobContract(contractType as JobContractType),
    value: contractType,
  }))
}

// work mode: Stationary / Hybrid / Remote
export const mapEmploymentModes = (employmentModes: EmploymentMode[]) => {
  return employmentModes.map((employmentMode) => {
    if (!employmentMode) return ''
    return mapEmploymentMode(employmentMode)
  })
}

export const mapEmploymentMode = (employmentMode: EmploymentMode) => {
  switch (employmentMode) {
    case EmploymentMode.STATIONARY:
      return 'Stationary'
    case EmploymentMode.HYBRID:
      return 'Hybrid'
    case EmploymentMode.REMOTE:
      return 'Remote'
    default:
      return employmentMode
  }
}
export const mappedEmploymentMode = Object.values(EmploymentMode).map(
  (employmentMode) => ({
    name: mapEmploymentMode(employmentMode),
    value: employmentMode,
  }),
)

/**
 * Transform a JobModel into CreateJobFormValues format
 * for use with the CreateJobForm component
 */
export function transformJobToFormValues(
  jobData: JobModel,
): CreateJobFormValues {
  // Map contract type correctly
  const contractTypeValue = (jobData.contractType || 'B2B') as JobContractType
  const contractType = {
    name: getContractTypeName(contractTypeValue),
    value: contractTypeValue,
  }

  // Map employment types correctly
  const employmentTypes =
    jobData.employmentTypes && jobData.employmentTypes.length > 0
      ? jobData.employmentTypes.map((type) => type as unknown as EmploymentType)
      : [EmploymentType.FULL_TIME] // Default to FULL_TIME if empty

  // Map employment modes correctly
  const employmentModes =
    jobData.employmentModes && jobData.employmentModes.length > 0
      ? jobData.employmentModes.map((mode) => mode as unknown as EmploymentMode)
      : [EmploymentMode.HYBRID] // Default to HYBRID if empty

  // Determine budget type
  const budgetType = determineBudgetType(jobData)

  const formValues: CreateJobFormValues = {
    jobName: jobData.jobName,
    projectBrief: jobData.projectBrief || '',
    techStack: jobData.techStack.map((tech) => ({
      name: tech.name,
      value: tech.name.toLowerCase(),
    })),
    budgetType: budgetType,
    currency: jobData.currency || Currency.PLN,
    minBudgetForProjectRealisation:
      jobData.minBudgetForProjectRealisation ?? null,
    maxBudgetForProjectRealisation:
      jobData.maxBudgetForProjectRealisation ?? null,
    contractType: contractType,
    employmentType: employmentTypes,
    employmentMode: employmentModes,
    country: jobData.country || '',
    city: jobData.city || '',
    state: jobData.state || PublishingState.DRAFT,
    remoteOnly: !!jobData.remoteOnly,
    terms: true, // Always true for editing forms
  }

  return formValues
}

/**
 * Helper function to get a display name for contract types
 */
function getContractTypeName(contractType: JobContractType): string {
  // Use the existing mapJobContract function to ensure consistent translations
  return mapJobContract(contractType)
}

/**
 * Determine budget type based on job data
 */
function determineBudgetType(jobData: JobModel): BudgetType {
  // If both min and max budget are present, it's a fixed budget
  if (
    jobData.minBudgetForProjectRealisation &&
    jobData.maxBudgetForProjectRealisation
  ) {
    return BudgetType.FIXED
  }

  // If budgetType is explicitly specified, use that
  if (jobData.budgetType) {
    return jobData.budgetType as BudgetType
  }

  // Default to REQUEST_QUOTE if we can't determine
  return BudgetType.REQUEST_QUOTE
}
