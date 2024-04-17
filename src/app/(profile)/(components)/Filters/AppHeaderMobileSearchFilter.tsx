'use client'
import {
  createFiltersObjFromSearchParams,
  createQueryString,
} from '@/app/(profile)/profile.helpers'
import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/(profile)/profile.types'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const AppHeaderMobileSearchFilter = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery()

  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const handleFilterChange = (
    filterName: JobOfferFiltersEnum,
    value: string,
  ) => {
    const newSearchParams = createQueryString(filterName, value, searchParams)

    router.push(`${pathname}?${newSearchParams}`)
  }

  const isOnProfilesPage = pathname.startsWith(AppRoutes.profilesList)

  if (isMobile) {
    return (
      <>
        {isOnProfilesPage && (
          <SearchBarWrapper
            jobOfferFilterName={JobOfferFiltersEnum.search}
            onSearch={handleFilterChange}
            value={filters[JobOfferFiltersEnum.search][0]}
          />
        )}
      </>
    )
  }

  return null
}
