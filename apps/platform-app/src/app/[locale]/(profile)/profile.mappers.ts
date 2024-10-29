import { SeniorityLevel } from '@/backend/profile/profile.types'
import { type DropdownOption } from '@gdh/ui-system'
import { Currency, EmploymentType } from '@prisma/client'
import { JobSpecialization } from './profile.types'

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

export const currencyButtonTextDisplay = (value: Currency): string => {
  switch (value) {
    case Currency.PLN:
      return 'PLN zł'
    case Currency.EUR:
      return 'EUR €'
    case Currency.USD:
      return 'USD $'
  }
}

export const hourlyRateOptions = (curr: Currency) => {
  function hourlyRateOptionsMaker(currency: string, step: number, max: number) {
    const ranges = []

    for (let i = 1; i < max; i += step) {
      const upper = i + step -1
      ranges.push({
        name: `${i} - ${upper} ${currency}/h`,
        value: `${i}-${upper}`,
      })
    }

    // Add the last "greater than max" range
    ranges.push({
      name: `> ${max} ${currency}/h`,
      value: `${max}-0`,
    })

    return ranges as DropdownOption[]
  }

  switch (curr) {
    case Currency.PLN:
      return hourlyRateOptionsMaker('zł', 50, 300)
    case Currency.EUR:
      return hourlyRateOptionsMaker('€', 18, 126)
    case Currency.USD:
      return hourlyRateOptionsMaker('$', 20, 140)
  }
}
