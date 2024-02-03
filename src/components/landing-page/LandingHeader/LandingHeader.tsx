import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findUserByEmail } from '@/backend/user/user.service'
import GitHubButtonClient from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import Logo from '@/components/Logo/Logo'
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
          <div className={styles.logoAndGhStarsWrapper}>
            <Logo />
            <div className={styles.starsMobile}>
              <GitHubButtonClient />
            </div>
          </div>
          <div className={styles.frameButtons}>
            <div className={styles.buttonBoxDesktop}>
              <div>
                {' '}
                <GitHubButtonClient />
              </div>{' '}
              {/* <div>Button</div>{' '} */}
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
