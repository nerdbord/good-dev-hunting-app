'use client'
import {
  createFiltersObjFromSearchParams,
  createQueryString,
} from '@/app/[locale]/(profile)/profile.helpers'
import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/[locale]/(profile)/profile.types'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { AppRoutes } from '@/utils/routes'
import { useLocale } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const removeLocaleFromPath = (pathname: string, locale: string) => {
  const localePattern = new RegExp(`^/${locale}(/|$)`)
  return pathname.replace(localePattern, '/')
}

export const AppHeaderMobileSearchFilter = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery()
  const locale = useLocale()
  const normalizedPathname = removeLocaleFromPath(pathname, locale)

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

  const isOnProfilesPage = normalizedPathname.startsWith(AppRoutes.profilesList)

  if (isMobile && isOnProfilesPage) {
    return (
      <SearchBarWrapper
        jobOfferFilterName={JobOfferFiltersEnum.search}
        onSearch={handleFilterChange}
        value={filters[JobOfferFiltersEnum.search][0]}
      />
    )
  }

  return null
}
