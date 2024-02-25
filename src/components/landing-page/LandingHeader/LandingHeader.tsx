import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { getAuthorizedUser } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import Logo from '@/components/Logo/Logo'
import styles from './LandingHeader.module.scss'

const LandingHeader = async () => {
  const { session, user } = await getAuthorizedUser()

  if (session) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Logo />

            <div className={styles.frameButtons}>
              {user?.profile ? (
                <>
                  <GithubStarsButton />
                  <MyProfileBtn />
                </>
              ) : (
                <>
                  <GithubStarsButton />
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
            <GithubStarsButton />
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
