import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import { auth } from '@/auth'
import { findUserByEmail } from '@/backend/user/user.service'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

const AppHeader = async () => {
  const session = await auth()

  const user = session ? await findUserByEmail(session.user.email) : null
  const userIsModerator = user?.roles.includes(Role.MODERATOR)

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Link href={AppRoutes.profiles} className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>

            <div className={styles.frameButtons}>
              {userIsModerator && <ModerationBtn />}
              {user?.profile ? (
                <>
                  <div className={styles.hideOnMobile}>
                    <GithubStarsButton />
                  </div>
                  <GithubAcc />
                </>
              ) : (
                <>
                  <GithubStarsButton />
                  <CreateProfileBtn data-testid="create-profile-button" />
                </>
              )}
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
          <Link href={AppRoutes.profiles} className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>

          <div className={styles.frameButtons}>
            <div className={styles.buttonBox}>
              <GithubStarsButton />
              <FindTalentsBtn variant="secondary" />
              <LoginBtnsWrapper />
              <div className={styles.hideOnMobile}>
                <CreateProfileBtn data-testid="create-profile-button" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
export default AppHeader
