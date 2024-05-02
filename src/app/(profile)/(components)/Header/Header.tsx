import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import HunterAcc from '@/app/(auth)/(components)/HunterAcc/HunterAcc'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
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
interface HeaderProps {
  pathname?: '/' | '/profiles'
}

const Header = async ({ pathname = '/' }: HeaderProps) => {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  let contentDesktop: JSX.Element | null = null
  if (pathname === '/') {
    contentDesktop = (
      <>
        <FindTalentsBtn variant="tertiary" />
        <LoginBtnsWrapper />
        <CreateProfileBtn />
      </>
    )
  }
  if (pathname === '/profiles') {
    contentDesktop = (
      <>
        <FindTalentsBtn variant="tertiary" />
        <LoginBtnsWrapper />
        <CreateProfileBtn />
      </>
    )
  }

  let contentMobile: JSX.Element | null = null
  if (pathname === '/') {
    contentMobile = <LoginBtn variant="tertiary">Login</LoginBtn>
  }

  if (pathname === '/profiles') {
    contentMobile = (
      <>
        <HamburgerMenuMobileBtn
          userHasProfile={userHasProfile}
          userIsModerator={userIsModerator}
        />
      </>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.logoAndGhStarsWrapper}>
            <Link href={AppRoutes.home} className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>
            <GithubStarsButton />
          </div>
          <div className={`${styles.hideOnDesktop} ${styles.loginBtnsMobile}`}>
            {contentMobile}
          </div>
          <div className={`${styles.frameButtons} ${styles.hideOnMobile}`}>
            {userIsModerator && <ModerationBtn />}
            {user ? (
              <>
                {!userIsHunter && userHasProfile ? (
                  <>
                    <GithubAcc />
                  </>
                ) : (
                  <>
                    {userIsHunter ? (
                      <>
                        <HunterAcc />
                        <LogOutBtn />
                      </>
                    ) : (
                      <>
                        <CreateProfileBtn data-testid="create-profile-button" />
                        <LogOutBtn />
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              contentDesktop
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
