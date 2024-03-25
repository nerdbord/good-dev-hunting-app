import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

const AppHeader = async () => {
  const { user, userIsHunter, userIsModerator } = await getAuthorizedUser()

  if (user) {
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
              {!userIsHunter && user.profile ? (
                <>
                  <div className={styles.hideOnMobile}>
                    <GithubStarsButton />
                  </div>
                  <GithubAcc />
                </>
              ) : (
                <>
                  <GithubStarsButton />
                  {!userIsHunter && (
                    <CreateProfileBtn data-testid="create-profile-button" />
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
