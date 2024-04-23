import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/(profile)/profile.types'
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
    [JobOfferFiltersEnum.salary]: [],
  }

  for (const [key, value] of searchParams.entries()) {
    filters[key as keyof SearchParamsFilters] = value.split(',')
  }

  return filters
}
