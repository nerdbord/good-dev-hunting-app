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

//HOURLY RATE
// export const hourlyRateOptions: DropdownOption[] = [
//   { name: '< 50 zł/h', value: '1-50' },
//   { name: '50 - 100 zł/h', value: '50-100' },
//   { name: '100 - 150 zł/h', value: '100-150' },
//   { name: '150 - 200 zł/h', value: '150-200' },
//   { name: '200 - 250 zł/h', value: '200-250' },
//   { name: '250 - 300 zł/h', value: '250-300' },
//   { name: '300 - 350 zł/h', value: '300-350' },
//   { name: '> 350 zł/h', value: '350-0' },
// ]

// export const hourlyRateOptionsCurrency = (curr: Currency) => {
//   return [
//     { name: `< 50 ${curr}/h`, value: `1-50` },
//     { name: `50 - 100 ${curr}/h`, value: `50-100` },
//     { name: `100 - 150 ${curr}/h`, value: `100-150` },
//     { name: `150 - 200 ${curr}/h`, value: `150-200` },
//     { name: `200 - 250 ${curr}/h`, value: `200-250` },
//     { name: `250 - 300 ${curr}/h`, value: `250-300` },
//     { name: `300 - 350 ${curr}/h`, value: `300-350` },
//     { name: `> 350 ${curr}/h`, value: `350-0` },
//   ] as DropdownOption[]
// }

// export const hourlyRateOptionsPLN: DropdownOption[] = [
//   { name: '< 50 zł/h', value: '1-50' },
//   { name: '50 - 100 zł/h', value: '50-100' },
//   { name: '100 - 150 zł/h', value: '100-150' },
//   { name: '150 - 200 zł/h', value: '150-200' },
//   { name: '200 - 250 zł/h', value: '200-250' },
//   { name: '250 - 300 zł/h', value: '250-300' },
//   { name: '300 - 350 zł/h', value: '300-350' },
//   { name: '> 350 zł/h', value: '350-0' },
// ]

// export const hourlyRateOptionsEUR: DropdownOption[] = [
//   { name: `< 20 USD/h`, value: `1-20` },
//   { name: `20 - 40 USD/h`, value: `20-40` },
//   { name: `40 - 60 USD/h`, value: `40-60` },
//   { name: `60 - 80 USD/h`, value: `60-80` },
//   { name: `80 - 100 USD/h`, value: `80-100` },
//   { name: `100 - 120 USD/h`, value: `100-120` },
//   { name: `120 - 140 USD/h`, value: `120-140` },
//   { name: `> 140 USD/h`, value: `140-0` },
// ]

// export const hourlyRateOptionsUSD: DropdownOption[] = [
//   { name: `< 18 EUR/h`, value: `1-18` },
//   { name: `18 - 36 EUR/h`, value: `18-36` },
//   { name: `36 - 54 EUR/h`, value: `36-54` },
//   { name: `54 - 72 EUR/h`, value: `54-72` },
//   { name: `72 - 90 EUR/h`, value: `72-90` },
//   { name: `90 - 108 EUR/h`, value: `90-108` },
//   { name: `108 - 126 EUR/h`, value: `108-126` },
//   { name: `> 126 EUR/h`, value: `126-0` },
// ]

export const hourlyRateOptions = (curr: Currency) => {
  function hourlyRateOptionsMaker(currency: string, step: number, max: number) {
    const ranges = []

    for (let i = 1; i < max; i += step) {
      const upper = i + step
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
