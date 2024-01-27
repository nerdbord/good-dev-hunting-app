import { SeniorityLevel } from '@/data/backend/profile/types'
import {
  AvailabilityEnum,
  JobSpecialization,
} from '@/data/frontend/profile/types'
import { EmploymentType } from '@prisma/client'

export const mapEmploymentTypes = (employmentTypes: EmploymentType[]) => {
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

export const mapAvailability = (availability: AvailabilityEnum) => {
  switch (availability) {
    case AvailabilityEnum.PART_TIME:
      return 'Part time'
    case AvailabilityEnum.FULL_TIME:
      return 'Full time'
    case AvailabilityEnum.CONTRACT:
      return 'Contract'
    default:
      return availability
  }
}

export const mappedEmploymentType = mapEmploymentTypes(
  Object.values(EmploymentType),
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

// TODO: Wziąć z DB (chociaż czy trzeba?)
export const mappedAvailability = (
  ['PART_TIME', 'FULL_TIME', 'CONTRACT'] as AvailabilityEnum[]
).map((availability) => ({
  name: mapAvailability(availability),
  value: availability,
}))
// TODO: Szymon tu będzie działał
export const mappedTechnologies = [
  'Javascript',
  'Python',
  'Node.js',
  'React.js',
  'Vue.js',
  'Angular',
  'MongoDB',
].map((technology) => ({
  name: technology,
  value: technology,
}))
