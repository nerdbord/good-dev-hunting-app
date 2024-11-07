// Simplified imports with index files

import GithubAcc from '@/app/[locale]/(auth)/(components)/GithubAcc/GithubAcc'
import HamburgerMenuMobileBtn from '@/app/[locale]/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import HunterAcc from '@/app/[locale]/(auth)/(components)/HunterAcc/HunterAcc'
import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { AppHeaderMobileSearchFilter } from '@/app/[locale]/(profile)/(components)/Filters/AppHeaderMobileSearchFilter'

import CreateProfileBtn from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'

import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import { AppRoutes } from '@/utils/routes'
import { Container, GitHubStarsButton } from '@gdh/ui-system'

import ModerationBtn from '@/app/[locale]/(moderation)/(components)/ModerationBtn/ModerationBtn'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher'
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
        userHasProfile={false} // tutaj ustawiam na false, żeby spełniało warunek dla niezalogowanych użytkowników
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
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.logoAndGhStarsWrapper}>
            <Link href={AppRoutes.home} className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <h1 className={styles.title}>Good Dev Hunting</h1>
            </Link>
            <GitHubStarsButton />
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
