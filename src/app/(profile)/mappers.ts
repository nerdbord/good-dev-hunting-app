import { JobSpecialization, type HourlyRateValue } from '@/app/(profile)/types'
import { SeniorityLevel } from '@/backend/profile/profile.types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
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

export const mapSeniorityLevel = (seniorityLevel: SeniorityLevel | string) => {
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
    case JobSpecialization.Mobile:
      return 'Mobile'
    case JobSpecialization.DevOps:
      return 'DevOps'
    case JobSpecialization.QA:
      return 'QA'
    case JobSpecialization.DataScience:
      return 'Data Science'
    case JobSpecialization.GameDev:
      return 'GameDev'
    case JobSpecialization.VR_AR:
      return 'VR/AR'
    case JobSpecialization.UX_UI:
      return 'UX/UI'
    case JobSpecialization.Crypto:
      return 'Crypto'
    case JobSpecialization.CyberSecurity:
      return 'Cybersecurity'
    case JobSpecialization.SysAdmin:
      return 'SysAdmin'
    case JobSpecialization.PM:
      return 'Project Manager'
    case JobSpecialization.UX_Designer:
      return 'UX Designer'
    case JobSpecialization.UX_Researcher:
      return 'UX Researcher'
    case JobSpecialization.UX_Writer:
      return 'UX Writer'
    case JobSpecialization.UI_Designer:
      return 'UI Designer'
    case JobSpecialization.UX_UI_Designer:
      return 'UX/UI Designer'
    case JobSpecialization.Product_Designer:
      return 'Product Designer'
    default:
      return specialization
  }
}

export const mapSpecializationToTitle = (specialization: JobSpecialization) => {
  switch (specialization) {
    case JobSpecialization.Frontend:
      return 'Frontend Developer'
    case JobSpecialization.Backend:
      return 'Backend Developer'
    case JobSpecialization.Fullstack:
      return 'Fullstack Developer'
    case JobSpecialization.Mobile:
      return 'Mobile Developer'
    case JobSpecialization.DevOps:
      return 'DevOps Engineer'
    case JobSpecialization.QA:
      return 'QA Engineer'
    case JobSpecialization.DataScience:
      return 'Data Scientist'
    case JobSpecialization.GameDev:
      return 'Game Developer'
    case JobSpecialization.VR_AR:
      return 'VR/AR Developer'
    case JobSpecialization.UX_UI:
      return 'UX/UI Designer'
    case JobSpecialization.Crypto:
      return 'Blockchain Developer'
    case JobSpecialization.CyberSecurity:
      return 'Cybersecurity Specialist'
    case JobSpecialization.SysAdmin:
      return 'System Administrator'
    case JobSpecialization.PM:
      return 'Project Manager'
    case JobSpecialization.UX_Designer:
      return 'UX Designer'
    case JobSpecialization.UX_Researcher:
      return 'UX Researcher'
    case JobSpecialization.UX_Writer:
      return 'UX Writer'
    case JobSpecialization.UI_Designer:
      return 'UI Designer'
    case JobSpecialization.UX_UI_Designer:
      return 'UX/UI Designer'
    case JobSpecialization.Product_Designer:
      return 'Product Designer'
    default:
      return `${specialization} Specialist`
  }
}

export const mapOptions = <T extends { name: string }>(
  items: T[],
): DropdownOption[] =>
  items.map((item) => ({
    name: item.name,
    value: item.name,
  }))

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

// If this mapping is not used anywhere else in the application, it can be safely removed once the application is fully operational and confirmed to work without it
export const mappedSpecialization = Object.values(JobSpecialization).map(
  (specialization) => ({
    name: mapSpecialization(specialization),
    value: specialization,
  }),
)

export const mapSpecializations = (
  specializations: string[],
): DropdownOption[] => {
  return specializations.map((specialization) => ({
    name: mapSpecialization(specialization as JobSpecialization),
    value: specialization,
  }))
}
//HOURLY RATE
export const hourlyRateOptions: DropdownOption[] = [
  { name: '< 100 zł/h', value: '0-99' },
  { name: '100 - 150 zł/h', value: '100-150' },
  { name: '150 - 200 zł/h', value: '150-200' },
  { name: '200 - 250 zł/h', value: '200-250' },
  { name: '250 - 300 zł/h', value: '250-300' },
  { name: '300 - 350 zł/h', value: '300-350' },
  { name: '> 300 zł/h', value: '300-null' },
]

export const parseHourlyRateValue = (value: string): HourlyRateValue => {
  const [min, max] = value.split('-')
  return {
    hourlyRateMin: min === 'null' ? null : parseInt(min),
    hourlyRateMax: max === 'null' ? null : parseInt(max),
  }
}

export const formatHourlyRateLabel = (
  min: number | null,
  max: number | null,
): string => {
  if (min === null) return `< ${max} zł/h`
  if (max === null) return `> ${min} zł/h`
  return `${min} - ${max} zł/h`
}
