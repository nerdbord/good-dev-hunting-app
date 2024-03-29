import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { authOptions } from '@/app/(auth)/auth'

import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import { AppHeaderMobileSearchFilter } from '@/app/(profile)/(components)/Filters/AppHeaderMobileSearchFilter'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import { findUserByEmail } from '@/backend/user/user.service'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

const AppHeader = async () => {
  const session = await getServerSession(authOptions)

  const user = session ? await findUserByEmail(session.user.email) : null
  const userIsModerator = user?.roles.includes(Role.MODERATOR)
  const userHasProfile = !!user?.profile

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.logoAndGhStarsWrapper}>
              <Link href={AppRoutes.profiles} className={styles.logo}>
                <img src={logo.src} alt="Logo" />
                <div className={styles.title}>Good Dev Hunting</div>
              </Link>
              <div className={styles.hideOnMobile}>
                <GithubStarsButton />
              </div>
            </div>

            <div className={styles.frameButtons}>
              {userIsModerator && <ModerationBtn />}
              {userHasProfile ? (
                <>
                  <GithubAcc />
                </>
              ) : (
                <>
                  <CreateProfileBtn data-testid="create-profile-button" />
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
            <Link href={AppRoutes.profiles} className={styles.logo}>
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
