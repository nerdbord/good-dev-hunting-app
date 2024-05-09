// Simplified imports with index files

import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import HunterAcc from '@/app/(auth)/(components)/HunterAcc/HunterAcc'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { AppHeaderMobileSearchFilter } from '@/app/(profile)/(components)/Filters/AppHeaderMobileSearchFilter'
import ModerationBtn from '@/app/(profile)/(routes)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtn from '@/components/LoginBtn/LoginBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './Header.module.scss'

async function Header({ buttonsVariant = 'main' }) {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  const mainDesktopButtons = (
    <>
      <li>
        <FindTalentsBtn variant="tertiary" />
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
      <LoginBtn variant="tertiary">Login</LoginBtn>
    </li>
  )

  const profilesMobileButtons = (
    <>
      {mainMobileButtons}
      <li>
        <AppHeaderMobileSearchFilter />
      </li>
    </>
  )

  const renderDesktopContent = () => {
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
                <li>
                  <CreateProfileBtn data-testid="create-profile-button" />
                </li>
              )}
              <li>
                <LogOutBtn />
              </li>
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
            <GithubStarsButton />
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
