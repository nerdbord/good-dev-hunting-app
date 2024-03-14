import { JobOfferFiltersEnum } from '@/app/(profile)/types'
import { type ReadonlyURLSearchParams } from 'next/navigation'

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
