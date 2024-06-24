import styles from './page.module.scss'

// components
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import Header from '@/app/[locale]/(profile)/(components)/Header/Header'
import { AppRoutes } from '@/utils/routes'
import { Container } from '@gdh/ui-system'
import { redirect } from 'next/navigation'
import LoginDev from './(components)/LoginDev/LoginDev'
import LoginHunter from './(components)/LoginHunter/LoginHunter'

const LoginPage = async () => {
  const { user } = await getAuthorizedUser()
  if (user) redirect(AppRoutes.profilesList)

  return (
    <>
      <Header buttonsVariant="signin" />
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
