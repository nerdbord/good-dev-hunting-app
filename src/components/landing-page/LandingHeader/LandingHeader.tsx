import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import Logo from '@/components/Logo/Logo'
import styles from './LandingHeader.module.scss'

const LandingHeader = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()

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
              {!userIsHunter && (
                <>{user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}</>
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
