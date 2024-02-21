import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findUserByEmail } from '@/backend/user/user.service'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import Logo from '@/components/Logo/Logo'
import { getServerSession } from 'next-auth'
import styles from './LoginHeader.module.scss'

const LoginHeader = async () => {
  const session = await getServerSession(authOptions)

  const user = session?.user?.email
    ? await findUserByEmail(session.user.email)
    : null

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
