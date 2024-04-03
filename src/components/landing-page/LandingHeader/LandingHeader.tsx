import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import Logo from '@/components/Logo/Logo'
import styles from './LandingHeader.module.scss'

const LandingHeader = async () => {
  const { user, userIsHunter, userIsModerator } = await getAuthorizedUser()

  if (user) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.logoAndGhStarsWrapper}>
              <Logo />
              <GithubStarsButton />
            </div>

            <div className={styles.frameButtons}>
              {userIsModerator && <ModerationBtn />}
              {!userIsHunter && user.profile ? (
                <GithubAcc />
              ) : (
                <>
                  {userIsHunter ? (
                    <>
                      <p>HUNTER: {user.email}</p>
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
            <GithubStarsButton />
          </div>

          <div className={styles.frameButtons}>
            <div className={styles.buttonBoxDesktop}>
              <FindTalentsBtn variant="tertiary" />
              <LoginBtnsWrapper />
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
