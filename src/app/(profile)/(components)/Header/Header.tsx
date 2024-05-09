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
import { AppHeaderMobileSearchFilter } from '../Filters/AppHeaderMobileSearchFilter'
import styles from './Header.module.scss'
interface HeaderProps {
  buttonsVariant?: 'main' | 'profiles' | 'signin'
}

const Header = async ({ buttonsVariant = 'main' }: HeaderProps) => {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  let contentDesktop: JSX.Element | null = null
  if (buttonsVariant === 'main') {
    contentDesktop = (
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
  } else if (buttonsVariant === 'profiles') {
    contentDesktop = (
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
  } else if (buttonsVariant === 'signin') {
    contentDesktop = <CreateProfileBtn />
  }

  let contentMobile: JSX.Element | null = null
  if (buttonsVariant === 'main') {
    contentMobile = user ? (
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
  } else if (buttonsVariant === 'profiles') {
    contentMobile = (
      <>
        <li>
          <HamburgerMenuMobileBtn
            userHasProfile={userHasProfile}
            userIsModerator={userIsModerator}
          />
        </li>
        <li>
          <AppHeaderMobileSearchFilter />
        </li>
      </>
    )
  } else if (buttonsVariant === 'signin') {
    contentMobile = (
      <>
        <li>
          <HamburgerMenuMobileBtn
            userHasProfile={userHasProfile}
            userIsModerator={userIsModerator}
          />
        </li>
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
              <h1 className={styles.title}>Good Dev Hunting</h1>
            </Link>
            <GithubStarsButton />
          </div>
          <nav>
            <ul className={`${styles.hideOnDesktop} ${styles.loginBtnsMobile}`}>
              {contentMobile}
            </ul>
            <ul className={`${styles.frameButtons} ${styles.hideOnMobile}`}>
              {userIsModerator && (
                <li>
                  <ModerationBtn />
                </li>
              )}
              {user ? (
                <>
                  {!userIsHunter && userHasProfile ? (
                    <li>
                      <GithubAcc />
                    </li>
                  ) : (
                    <>
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
                          <li>
                            <CreateProfileBtn data-testid="create-profile-button" />
                          </li>
                          <li>
                            <LogOutBtn />
                          </li>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                contentDesktop
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header
