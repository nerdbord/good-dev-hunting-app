import styles from './page.module.scss'

// components
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import LoginDev from './(components)/LoginDev/LoginDev'
import LoginHeader from './(components)/LoginHeader/LoginHeader'
import LoginHunter from './(components)/LoginHunter/LoginHunter'

const LoginPage = async () => {
  const { user } = await getAuthorizedUser()
  if (user) redirect(AppRoutes.profilesList)

  return (
    <>
      <LoginHeader />
      <Container>
        <div className={styles.loginPage}>
          <LoginDev />
          <LoginHunter />
        </div>
      </Container>
    </>
  )
}

export default LoginPage
