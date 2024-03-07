import { getAuthorizedUser } from '@/auth'
import styles from './LoginHeader.module.scss'

// components
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import Logo from '@/components/Logo/Logo'

const LoginHeader = async () => {
  const { user } = await getAuthorizedUser()

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.brandingContainer}>
            <Logo />
            <GithubStarsButton />
          </div>

          {user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
        </div>
      </Container>
    </header>
  )
}

export default LoginHeader
