import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import styles from './LoginHeader.module.scss'

// components
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import Logo from '@/components/Logo/Logo'

const LoginHeader = async () => {
  const { user, userIsHunter } = await getAuthorizedUser()

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.brandingContainer}>
            <Logo />
            <div className={styles.hideOnMobile}>
              <GithubStarsButton />
            </div>
          </div>

          <div className={styles.frameButtons}>
            <div className={styles.buttonBoxDesktop}>
              <>
                {userIsHunter ? (
                  <p>HUNTER: {user?.email}</p>
                ) : (
                  <>{user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}</>
                )}
              </>
            </div>
            <div className={styles.buttonBoxMobile}>
              <HamburgerMenuMobileBtn />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default LoginHeader
