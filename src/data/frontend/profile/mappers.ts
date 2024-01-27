import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
import { SeniorityLevel } from '@/data/backend/profile/types'
import { JobSpecialization } from '@/data/frontend/profile/types'
import { apiClient } from '@/lib/apiClient'
import { EmploymentType } from '@prisma/client'

export const mapEmploymentTypes = (employmentTypes: EmploymentType[]) => {
  return employmentTypes.map((employmentType) => {
    if (!employmentType) return ''
    return mapEmploymentType(employmentType)
  })
}

export const mapEmploymentType = (employmentType: EmploymentType) => {
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
}

export const mapSeniorityLevel = (seniorityLevel: SeniorityLevel) => {
  switch (seniorityLevel) {
    case SeniorityLevel.INTERN:
      return 'Intern'
    case SeniorityLevel.JUNIOR:
      return 'Junior'
    case SeniorityLevel.MIDDLE:
      return 'Middle'
    case SeniorityLevel.SENIOR:
      return 'Senior'
    case SeniorityLevel.LEAD_EXPERT:
      return 'Lead/Expert'
    default:
      return seniorityLevel
  }
}

export const mapSpecialization = (specialization: JobSpecialization) => {
  switch (specialization) {
    case JobSpecialization.Frontend:
      return 'Frontend'
    case JobSpecialization.Backend:
      return 'Backend'
    case JobSpecialization.Fullstack:
      return 'Fullstack'
    default:
      return specialization
  }
}

export const mappedEmploymentType = Object.values(EmploymentType).map(
  (employment) => ({
    name: mapEmploymentType(employment),
    value: employment,
  }),
)

export const mappedSeniorityLevel = Object.values(SeniorityLevel).map(
  (level) => ({
    name: mapSeniorityLevel(level),
    value: level,
  }),
)

export const mappedSpecialization = Object.values(JobSpecialization).map(
  (specialization) => ({
    name: mapSpecialization(specialization),
    value: specialization,
  }),
)

// TODO: Wypluć dynamiczmnie
export const mappedLocations = ['Poland', 'Europe', 'Other'].map(
  (location) => ({
    name: location,
    value: location,
  }),
)

// TODO: Szymon tu będzie działał
export const mappedTechnologies: Promise<DropdownOption[]> = apiClient
  .getTechnologies()
  .then((technologies) =>
    technologies.map((technology) => ({
      name: technology.name,
      value: technology.name,
    })),
  )
