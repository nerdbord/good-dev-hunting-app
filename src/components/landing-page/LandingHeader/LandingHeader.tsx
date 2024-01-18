import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { Container } from '@/components/Container/Container'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import GithubAcc from '@/components/GithubAcc/GithubAcc'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import ModerationBtn from '@/components/ModerationBtn/ModerationBtn'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'
import { authOptions } from '@/lib/auth'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import styles from './LandingHeader.module.scss'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import Logo from '@/components/Logo/Logo'

const fetchData = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    const userProfile = await getProfileByUserEmail(session.user.email)
    const foundUser = await findUserByEmail(session.user.email)
    const isModerator = foundUser?.roles.includes(Role.MODERATOR)

    return {
      session,
      userIsModerator: isModerator,
      profile: userProfile,
      user: foundUser,
    }
  }

  return { session }
}

const LandingHeader = () => {
  /*  const { session, userIsModerator, profile, user } = await fetchData()

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
                  <MyProfileBtn />
                </>
              ) : (
                <div className={styles.frameButtons}>
                  <CreateProfileBtn data-testid="create-profile-button" />
                </div>
              )}
              {profile ? (
                <>
                  <GithubAcc />
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </header>
    )
  }
 */
  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.frameButtons}>
            <div className={styles.buttonBox}>
              <FindTalentsBtn />
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
