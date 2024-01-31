import { findUserByEmail } from '@/backend/user/user.service'
import GitHubButtonClient from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import Logo from '@/components/Logo/Logo'
import ModerationBtn from '@/components/ModerationBtn/ModerationBtn'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'
import { authOptions } from '@/lib/auth'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import styles from './LandingHeader.module.scss'

const LandingHeader = async () => {
  const session = await getServerSession(authOptions)

  const user = session ? await findUserByEmail(session.user.email) : null
  const userIsModerator = user?.roles.includes(Role.MODERATOR)

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Logo />
            <div className={styles.frameButtons}>
              {userIsModerator && <ModerationBtn />}
              {user?.profile ? (
                <>
                  <GitHubButtonClient />
                  <MyProfileBtn />
                </>
              ) : (
                <>
                  <MyProfileBtn />
                  <CreateProfileBtn />
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
          <Logo />
          <div className={styles.frameButtons}>
            <div className={styles.buttonBoxDesktop}>
              <FindTalentsBtn variant={'secondary'}>
                Find talents
              </FindTalentsBtn>
              <GithubLoginButton />
              <CreateProfileBtn />
            </div>
            <div className={styles.buttonBoxMobile}>
              <GithubLoginButton />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
export default LandingHeader
