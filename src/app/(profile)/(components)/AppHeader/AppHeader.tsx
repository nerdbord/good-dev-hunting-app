import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import { getAuthorizedUser } from '@/app/(auth)/helpers'

import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import { AppHeaderMobileSearchFilter } from '@/app/(profile)/(components)/Filters/AppHeaderMobileSearchFilter'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

const AppHeader = async () => {
  const { user, userIsHunter, userIsModerator } = await getAuthorizedUser()
  const userHasProfile = !!user?.profile

  if (user) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.logoAndGhStarsWrapper}>
              <Link href={AppRoutes.profilesList} className={styles.logo}>
                <img src={logo.src} alt="Logo" />
                <div className={styles.title}>Good Dev Hunting</div>
              </Link>
              <div className={styles.hideOnMobile}>
                <GithubStarsButton />
              </div>
            </div>

            <div className={styles.frameButtons}>
              {userIsModerator && <ModerationBtn />}
              {!userIsHunter && user.profile ? (
                <>
                  <div className={styles.hideOnMobile}>
                    <GithubStarsButton />
                  </div>
                  <GithubAcc />
                </>
              ) : (
                <>
                  <GithubStarsButton />
                  {!userIsHunter && (
                    <CreateProfileBtn data-testid="create-profile-button" />
                  )}
                </>
              )}
            </div>
            <div className={styles.hideOnDesktop}>
              <HamburgerMenuMobileBtn
                userHasProfile={userHasProfile}
                userIsModerator={userIsModerator}
              />
              <AppHeaderMobileSearchFilter />
            </div>
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.logoAndGhStarsWrapper}>
            <Link href={AppRoutes.profilesList} className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>
            <div className={styles.hideOnMobile}>
              <GithubStarsButton />
            </div>
          </div>
          <div className={styles.hideOnDesktop}>
            <HamburgerMenuMobileBtn
              userHasProfile={userHasProfile}
              userIsModerator={userIsModerator}
            />
            <AppHeaderMobileSearchFilter />
          </div>
          <div className={styles.frameButtons}>
            <GithubLoginButton />
            <CreateProfileBtn />
          </div>
        </div>
      </Container>
    </header>
  )
}
export default AppHeader
