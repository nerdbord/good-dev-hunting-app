'use client'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { AppRoutes } from '@/utils/routes'
import { usePathname } from 'next/navigation'
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
  const isOnProfilesPage = pathname === AppRoutes.profiles

  return (
    <div className={styles.menuWrapper}>
      <HamburgerMenuMobileBtn
        userHasProfile={userHasProfile}
        userIsModerator={userIsModerator}
      />
      {isOnProfilesPage && <SearchBarWrapper />}
    </div>
  )
}
