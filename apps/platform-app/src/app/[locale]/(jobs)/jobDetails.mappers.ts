import { type DropdownOption } from '@gdh/ui-system'
import { EmploymentMode, JobContractType } from './jobDetailsTypes'

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
