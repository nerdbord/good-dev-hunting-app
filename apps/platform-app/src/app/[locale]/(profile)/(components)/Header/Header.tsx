// Simplified imports with index files

import GithubAcc from '@/app/[locale]/(auth)/(components)/GithubAcc/GithubAcc'
import HamburgerMenuMobileBtn from '@/app/[locale]/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import HunterAcc from '@/app/[locale]/(auth)/(components)/HunterAcc/HunterAcc'
import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { AppHeaderMobileSearchFilter } from '@/app/[locale]/(profile)/(components)/Filters/AppHeaderMobileSearchFilter'
import { getAuthorizedUser } from '@/utils/auth.helpers'

import InboxButton from '@/app/[locale]/(profile)/(components)/InboxButton/InboxButton'
import CreateProfileBtn from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'

import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import { AppRoutes } from '@/utils/routes'
import { Container, GitHubStarsButton } from '@gdh/ui-system'

import ModerationBtn from '@/app/[locale]/(moderation)/(components)/ModerationBtn/ModerationBtn'
import Link from 'next/link'
import { Logo } from '../../../../../../../../packages/ui-system/src/components/Logo/Logo'
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'
import styles from './Header.module.scss'

interface HeaderProps {
  buttonsVariant?: 'main' | 'profiles' | 'signin'
}

async function Header({ buttonsVariant = 'main' }: HeaderProps) {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  const mainDesktopButtons = (
    <>
      <li>
        <LocaleSwitcher />
      </li>

      <li>
        <LoginBtnsWrapper />
      </li>
      <li>
        <CreateProfileBtn />
      </li>
    </>
  )

  const mainMobileButtons = user ? (
    <li>
      <HamburgerMenuMobileBtn
        userHasProfile={userHasProfile}
        userIsModerator={userIsModerator}
      />
    </li>
  ) : (
    <li>
      <HamburgerMenuMobileBtn
        userHasProfile={false}
        userIsModerator={false}
        userIsHunter={false}
      />
    </li>
  )

  const profilesMobileButtons = (
    <>
      <li>
        <HamburgerMenuMobileBtn
          userHasProfile={userHasProfile}
          userIsModerator={userIsModerator}
        />
      </li>
      {user && (
        <li>
          <AppHeaderMobileSearchFilter />
        </li>
      )}
    </>
  )

  const renderDesktopContent = () => {
    if (buttonsVariant === 'signin') {
      return (
        <>
          <li>
            <LocaleSwitcher />
          </li>
          <li>
            <CreateProfileBtn data-testid="create-profile-button" />
          </li>
        </>
      )
    }
    if (user) {
      return (
        <>
          {userIsModerator && (
            <li>
              <ModerationBtn />
            </li>
          )}
          {userIsHunter ? (
            <>
              <li>
                <HunterAcc />
              </li>
              <li>
                <LogOutBtn />
              </li>
            </>
          ) : (
            <>
              {!userHasProfile && (
                <>
                  <li>
                    <LocaleSwitcher />
                  </li>
                  <li>
                    <CreateProfileBtn data-testid="create-profile-button" />
                  </li>
                </>
              )}
              {userHasProfile && (
                <>
                  <li>
                    <InboxButton />
                  </li>
                  <li>
                    <LocaleSwitcher />
                  </li>
                  <li>
                    <GithubAcc />
                  </li>
                </>
              )}
            </>
          )}
        </>
      )
    }
    return mainDesktopButtons
  }

  const renderMobileContent = () => {
    switch (buttonsVariant) {
      case 'signin':
        return <>{mainMobileButtons}</>
      case 'profiles':
        return profilesMobileButtons
      default:
        return mainMobileButtons
    }
  }
  return (
    <header id="main-header" className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.logoAndGhStarsWrapper}>
            <Link href={AppRoutes.home} className={styles.logo}>
              <Logo withLink={false} />
            </Link>
            <GitHubStarsButton />
            <ThemeSwitcher />
          </div>
          <nav>
            <ul className={`${styles.hideOnDesktop} ${styles.loginBtnsMobile}`}>
              {renderMobileContent()}
            </ul>
            <ul className={`${styles.frameButtons} ${styles.hideOnMobile}`}>
              {renderDesktopContent()}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header
