import { EmploymentType } from '@prisma/client'
import { SeniorityLevel } from '@/data/backend/profile/types'

export const mapEmploymentType = (employmentType: EmploymentType) => {
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

export const mappedEmploymentType = Object.values(EmploymentType).map(
  (type) => ({
    name: mapEmploymentType(type),
    value: type,
  }),
)

export const mappedSeniorityLevel = Object.values(SeniorityLevel).map(
  (level) => ({
    name: mapSeniorityLevel(level),
    value: level,
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
