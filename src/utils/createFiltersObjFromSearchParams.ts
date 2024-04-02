import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/(profile)/types'
import { type ReadonlyURLSearchParams } from 'next/navigation'

export const createFiltersObjFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
) => {
  const filters: SearchParamsFilters = {
    [JobOfferFiltersEnum.technology]: [],
    [JobOfferFiltersEnum.seniority]: [],
    [JobOfferFiltersEnum.availability]: [],
    [JobOfferFiltersEnum.location]: [],
    [JobOfferFiltersEnum.search]: [],
    [JobOfferFiltersEnum.specialization]: [],
  }

  for (const [key, value] of searchParams.entries()) {
    filters[key as keyof SearchParamsFilters] = value.split(',')
  }

  return filters
}
