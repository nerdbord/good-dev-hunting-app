import styles from './page.module.scss'

// components
import Header from '@/app/[locale]/(profile)/(components)/Header/Header'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { Container } from '@gdh/ui-system'
import { redirect } from 'next/navigation'
import LoginDev from './(components)/LoginDev/LoginDev'
import LoginHunter from './(components)/LoginHunter/LoginHunter'

const LoginPage = async () => {
  const { user } = await getAuthorizedUser()
  if (user) redirect(AppRoutes.home)

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
