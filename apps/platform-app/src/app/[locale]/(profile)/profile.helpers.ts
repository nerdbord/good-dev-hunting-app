import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { type ProfilesStore } from '@/app/[locale]/(profile)/_stores/profiles.store'
import {
  JobOfferFiltersEnum,
  type HourlyRateValue,
  type JobSpecialization,
  type SearchParamsFilters,
} from '@/app/[locale]/(profile)/profile.types'
import { PublishingState } from '@prisma/client'
import { type ReadonlyURLSearchParams } from 'next/navigation'

export const ProfileVerification = {
  isApproved: (state: PublishingState) => state === PublishingState.APPROVED,
  isPending: (state: PublishingState) => state === PublishingState.PENDING,
  isRejected: (state: PublishingState) => state === PublishingState.REJECTED,
}

export const jobSpecializationThemes: Record<JobSpecialization, string> = {
  Frontend: '#13CBAA',
  Backend: '#FFB168',
  Fullstack: '#55B5EB',
  Mobile: '#555BEB',
  DevOps: '#BB55EB',
  QA: '#EB5555',
  DataScience: '#D2B66F',
  GameDev: '#EB7055',
  VR_AR: '#F38ECB',
  UX_UI: '#AB96FF',
  Crypto: '#F1F38E',
  CyberSecurity: '#6FD2CC',
  SysAdmin: '#9CE79B',
  PM: '#55EB91',
  UX_Designer: '#AB96FF',
  UX_Researcher: '#AB96FF',
  UX_Writer: '#AB96FF',
  UI_Designer: '#AB96FF',
  UX_UI_Designer: '#AB96FF',
  Product_Designer: '#AB96FF',
  AI_Developer: '#AB96FF',
  Product_Engineer: '#AB96FF',
  Automation_Engineer: '#AB96FF',
}

export const createFiltersObjFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
) => {
  const filters: SearchParamsFilters = {
    [JobOfferFiltersEnum.technology]: [],
    [JobOfferFiltersEnum.seniority]: [],
    [JobOfferFiltersEnum.specialization]: [],
    [JobOfferFiltersEnum.availability]: [],
    [JobOfferFiltersEnum.location]: [],
    [JobOfferFiltersEnum.search]: [],
    [JobOfferFiltersEnum.salary]: [],
  }

  for (const [key, value] of searchParams.entries()) {
    filters[key as keyof SearchParamsFilters] = value.split(',')
  }

  return filters
}

export const createQueryString = (
  name: string,
  value: string,
  initialParams?: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(initialParams?.toString())

  if (value === '') {
    params.delete(name)
  } else if (params.has(name)) {
    params.set(name, value)
  } else {
    params.append(name, value)
  }

  return params.toString().replaceAll('%2C', ',')
}

export const getHourlyRateDisplay = (
  hourlyRateMin: number | null,
  currency: string,
  hourlyRateMax: number | null,
) => {
  if (hourlyRateMin === null || hourlyRateMin < 1) {
    return null
  } else if (hourlyRateMin >= 350) {
    return `above ${hourlyRateMin} ${currency}/h`
  } else if (hourlyRateMin < 50) {
    return `below 50 ${currency}/h`
  } else {
    return `${hourlyRateMin} - ${hourlyRateMax} ${currency}/h`
  }
}

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

export const filterByPosition =
  (positionFilter: string[]) => (profile: ProfileModel) => {
    if (!positionFilter.length) return true
    return positionFilter.some(
      (pos) => profile.position.toUpperCase() === pos.toUpperCase(),
    )
  }

export const filterBySeniority =
  (seniorityFilter: string[]) => (profile: ProfileModel) => {
    if (!seniorityFilter.length) return true
    return seniorityFilter.some(
      (filter) => filter.toUpperCase() === profile.seniority.toUpperCase(),
    )
  }

export const filterBySpecialization =
  (specializations: string[]) => (profile: ProfileModel) => {
    if (!specializations.length) return true
    return specializations.some(
      (filter) => filter.toUpperCase() === profile.position.toUpperCase(),
    )
  }

// TODO: implement filter by location (cities and countreis should be implemented )
export const filterByLocation =
  (locationFilter: string[]) => (profile: ProfileModel) => {
    if (!locationFilter.length) return true
    return locationFilter.some((location) => profile.country === location)
  }

export const filterByTechnology =
  (technologyFilter: string[]) => (profile: ProfileModel) => {
    if (!technologyFilter.length) return true
    return technologyFilter.every(
      (techFilter) =>
        !!profile.techStack.find(
          (tech) => tech.name.toUpperCase() === techFilter.toUpperCase(),
        ),
    )
  }

export const filterByAvailability =
  (availabilityFilter: string[]) => (profile: ProfileModel) => {
    if (!availabilityFilter.length) return true
    return availabilityFilter.some(
      (availability) =>
        !!profile.employmentTypes.find(
          (employmentType) =>
            employmentType.toUpperCase() === availability.toUpperCase(),
        ),
    )
  }

export const filterByFullName = (searchTermFilter: string) => {
  return (profile: ProfileModel) => {
    if (!searchTermFilter) return true
    return profile.fullName
      .toUpperCase()
      .includes(searchTermFilter.toUpperCase())
  }
}

export const filterBySalary =
  (salaryFilter: string[]) => (profile: ProfileModel) => {
    if (salaryFilter.length === 0) return true

    return salaryFilter.some((salaryRange) => {
      const [min, max] = salaryRange
        .split('-')
        .map((str) => (str === 'null' ? Infinity : Number(str)))
      if (profile.hourlyRateMax === 0 && profile.hourlyRateMin === 350) {
        return min >= 350
      }
      if (profile.hourlyRateMin === 0 && profile.hourlyRateMax === 0) {
        return false
      }
      return profile.hourlyRateMin >= min && profile.hourlyRateMax <= max
    })
  }

export const filterProfiles = (
  profiles: ProfileModel[],
  filters: SearchParamsFilters,
  options?: { disableSpecFilter?: boolean },
) => {
  const filteredProfiles = profiles
    .filter(filterBySalary(filters.salary))
    .filter(filterBySeniority(filters.seniority))
    .filter(filterByLocation(filters.location))
    .filter(filterByTechnology(filters.technology))
    .filter(
      options?.disableSpecFilter
        ? () => true
        : filterBySpecialization(filters.specialization),
    )
    .filter(filterByAvailability(filters.availability))
    .filter(filterByFullName(filters.search[0]))
    .filter(() => true)
  return filteredProfiles
}

export const hasProfileValuesChanged = (
  foundProfile: ProfileModel,
  payload: ProfileModel,
) => {
  // Initialize array to store changed fields
  const changedFields: string[] = []

  // Compare each field in the payload with the existing profile data
  Object.keys(payload).some((key) => {
    // @ts-ignore
    if (JSON.stringify(foundProfile[key]) !== JSON.stringify(payload[key])) {
      changedFields.push(key)
    }
  })

  if (changedFields.length === 0) {
    return false
  } else {
    return changedFields
  }
}

export const hasCommonFields = (
  changedFields: string[],
  profilePendingFields: string[],
): boolean => {
  let hasCommon = false

  profilePendingFields.forEach((field) => {
    if (changedFields.includes(field)) {
      hasCommon = true
    }
  })

  return hasCommon
}

export const renderRelativeDateLabel = (date: Date) => {
  const today = new Date().setHours(0, 0, 0, 0)
  const dateToCheck = new Date(date).setHours(0, 0, 0, 0)

  const daysDifference = Math.round(
    (today - dateToCheck) / (1000 * 60 * 60 * 24),
  )

  switch (daysDifference) {
    case 0:
      return 'today'
    case 1:
      return 'yesterday'
    default:
      return `on ${date.toLocaleDateString()}`
  }
}

export const sortProfilesBySalary = (a: ProfileModel, b: ProfileModel) => {
  if (a.hourlyRateMin && !b.hourlyRateMin) return -1
  if (!a.hourlyRateMin && b.hourlyRateMin) return 1
  else return 0
}

export const getProfileCurrentState = (state: ProfilesStore): ProfilesStore =>
  state
