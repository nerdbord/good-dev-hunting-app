import { type DropdownOption } from '@gdh/ui-system'
import { Currency, EmploymentType, PublishingState } from '@prisma/client'
import { type JobModel } from '../_models/job.model'
import {
  BudgetType,
  EmploymentMode,
  JobContractType,
  type CreateJobFormValues,
} from './types'

// Define a type alias for the translation function that matches next-intl's pattern
type TFunction = (key: string, params?: Record<string, any>) => string

export const mapJobContract = (
  contractType: JobContractType,
  t?: TFunction,
): string => {
  if (t) {
    switch (contractType) {
      case JobContractType.B2B:
        return t('contractTypeB2B')
      case JobContractType.EMPLOYMENT_CONTRACT:
        return t('contractTypeEmploymentContract')
      case JobContractType.CONTRACT_FOR_SPECIFIC_WORK:
        return t('contractTypeSpecificWork')
      case JobContractType.CONTRACT_OF_MANDATE:
        return t('contractTypeMandate')
      default:
        return contractType
    }
  }

  // Fallback to hardcoded strings if no translation function is provided
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
export const mappedJobContractType = (t?: TFunction) =>
  Object.values(JobContractType).map((contractType) => ({
    name: mapJobContract(contractType, t),
    value: contractType,
  }))

export const mapJobContractType = (
  contractType: string[],
  t?: TFunction,
): DropdownOption[] => {
  return contractType.map((contractType) => ({
    name: mapJobContract(contractType as JobContractType, t),
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
  t?: TFunction,
): CreateJobFormValues {
  // Map contract type correctly
  const contractTypeValue = (jobData.contractType || 'B2B') as JobContractType
  const contractType = {
    name: getContractTypeName(contractTypeValue, t),
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
function getContractTypeName(
  contractType: JobContractType,
  t?: TFunction,
): string {
  // Use the existing mapJobContract function to ensure consistent translations
  return mapJobContract(contractType, t)
}

/**
 * Determine budget type based on job data
 */
function determineBudgetType(jobData: JobModel): BudgetType {
  // If both min and max budget are present, it's a fixed budget
  if (
    jobData.minBudgetForProjectRealisation !== null &&
    jobData.minBudgetForProjectRealisation !== undefined &&
    jobData.maxBudgetForProjectRealisation !== null &&
    jobData.maxBudgetForProjectRealisation !== undefined
  ) {
    return BudgetType.FIXED
  }

  // If budgetType is explicitly specified, use that
  if (jobData.budgetType) {
    // Check in a case-insensitive way
    const budgetTypeUpper = jobData.budgetType.toUpperCase()

    if (BudgetType.FIXED.toUpperCase() === budgetTypeUpper) {
      return BudgetType.FIXED
    }

    if (BudgetType.REQUEST_QUOTE.toUpperCase() === budgetTypeUpper) {
      return BudgetType.REQUEST_QUOTE
    }
  }

  // Default to REQUEST_QUOTE if we can't determine
  return BudgetType.REQUEST_QUOTE
}
