﻿'use client'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import { createQueryString } from '@/app/(profile)/helpers'
import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/(profile)/types'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { createFiltersObjFromSearchParams } from '@/utils/createFiltersObjFromSearchParams'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './AppHeaderMobileMenu.module.scss'

type AppHeaderMobileMenuProps = {
  userHasProfile?: boolean | null | undefined
  userIsModerator?: boolean | null | undefined
}

export const AppHeaderMobileMenu = ({
  userHasProfile,
  userIsModerator,
}: AppHeaderMobileMenuProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

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

  const isOnProfilesPage = pathname.startsWith(AppRoutes.profiles)

  return (
    <div className={styles.menuWrapper}>
      <HamburgerMenuMobileBtn
        userHasProfile={userHasProfile}
        userIsModerator={userIsModerator}
      />
      {isOnProfilesPage && (
        <SearchBarWrapper
          jobOfferFilterName={JobOfferFiltersEnum.search}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.search][0]}
        />
      )}
    </div>
  )
}
