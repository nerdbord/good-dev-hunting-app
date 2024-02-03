import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { authOptions } from '@/app/(auth)/auth'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import { findUserByEmail } from '@/backend/user/user.service'
import GitHubButtonClient from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
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
              <GitHubButtonClient />
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
