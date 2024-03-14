'use client'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import { JobOfferFiltersEnum } from '@/app/(profile)/types'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { createFiltersObjFromSearchParams } from '@/utils/createFiltersObjFromSearchParams'
import { createQueryString } from '@/utils/createQueryString'
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

  const filters: Record<JobOfferFiltersEnum, string[]> = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const handleSearchChange = (value: string) => {
    const newSearchParams = createQueryString(
      JobOfferFiltersEnum.search,
      value,
      searchParams,
    )

    router.push(`${pathname}?${newSearchParams}`)
  }

  const isOnProfilesPage = pathname === AppRoutes.profiles

  return (
    <div className={styles.menuWrapper}>
      <HamburgerMenuMobileBtn
        userHasProfile={userHasProfile}
        userIsModerator={userIsModerator}
      />
      {isOnProfilesPage && (
        <SearchBarWrapper
          onSearch={handleSearchChange}
          value={filters[JobOfferFiltersEnum.search][0]}
        />
      )}
    </div>
  )
}
