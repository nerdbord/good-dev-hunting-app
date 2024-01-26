import { EmploymentType } from '@prisma/client'

export const mapEmploymentType = (employmentTypes: EmploymentType[]) => {
  return employmentTypes.map((employmentType) => {
    if (!employmentType) return ''

    switch (employmentType) {
      case EmploymentType.FULL_TIME:
        return 'Full-time'
      case EmploymentType.PART_TIME:
        return 'Part-time'
      case EmploymentType.CONTRACT:
        return 'Contract'
      default:
        return employmentType
    }
  })
}
