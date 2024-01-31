import logo from '@/assets/images/logo.png'
import { findUserByEmail } from '@/backend/user/user.service'
import GitHubButtonClient from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import GithubAcc from '@/components/GithubAcc/GithubAcc'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import ModerationBtn from '@/components/ModerationBtn/ModerationBtn'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

const AppHeader = async () => {
  const session = await getServerSession(authOptions)

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
                  <GitHubButtonClient />
                  <GithubAcc />
                </>
              ) : (
                <>
                  <GitHubButtonClient />
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
              {/* <GitHubButtonClient /> */}
              <FindTalentsBtn variant="secondary">Find talents</FindTalentsBtn>
              <GithubLoginButton />
              <CreateProfileBtn />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
export default AppHeader
