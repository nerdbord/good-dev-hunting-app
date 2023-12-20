import logo from '@/assets/images/logo.png'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { Container } from '@/components/Container/Container'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import GithubAcc from '@/components/GithubAcc/GithubAcc'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

const AppHeader = async () => {
  const session = await getServerSession(authOptions)

  const profile = session?.user
    ? await getProfileByUserEmail(session.user.email)
    : null

  if (session?.user) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>
            <div className={styles.frameButtons}>
              <div className={styles.buttonBox}>
                {profile ? (
                  <MyProfileBtn />
                ) : (
                  <CreateProfileBtn data-testid="create-profile-button" />
                )}
              </div>
            </div>
            {profile ? <GithubAcc /> : null}
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={AppRoutes.home} className={styles.logo}>
            <img src={logo.src} alt="Logo" />
            <div className={styles.title}>Good Dev Hunting</div>
          </Link>
          <div className={styles.frameButtons}>
            <div className={styles.buttonBox}>
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
