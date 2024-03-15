import {
  JobOfferFiltersEnum,
  type JobSpecialization,
} from '@/app/(profile)/types'
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
}

export const createFiltersObjFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
) => {
  const filters: Record<JobOfferFiltersEnum, string[]> = {
    [JobOfferFiltersEnum.technology]: [],
    [JobOfferFiltersEnum.seniority]: [],
    [JobOfferFiltersEnum.availability]: [],
    [JobOfferFiltersEnum.location]: [],
    [JobOfferFiltersEnum.search]: [],
  }

  for (const [key, value] of searchParams.entries()) {
    filters[key as JobOfferFiltersEnum] = value.split(',')
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
