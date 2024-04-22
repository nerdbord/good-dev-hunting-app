import {
  JobOfferFiltersEnum,
  type HourlyRateValue,
  type JobSpecialization,
  type SearchParamsFilters,
} from '@/app/(profile)/profile.types'
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
  if (hourlyRateMin === null || hourlyRateMin < 10) {
    return `Rate not specified`
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
