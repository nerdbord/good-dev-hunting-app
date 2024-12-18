import { type DropdownOption } from '@gdh/ui-system'
import { JobContractType } from './jobDetailsTypes'

export const mapJobContract = (contractType: JobContractType): string => {
  switch (contractType) {
    case JobContractType.B2B:
      return 'B2B'
    case JobContractType.EMPLOYMENT_CONTRACT:
      return 'Employment contract'
    case JobContractType.CONTRACT_FOR_SPECIFIC_WORK:
      return 'Contract for specific work'
    case JobContractType.CONTRACT_OF_MANDATE:
      return 'Contract of mandate'
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
