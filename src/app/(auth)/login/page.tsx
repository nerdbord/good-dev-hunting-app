import styles from './page.module.scss'

// components
import { Container } from '@/components/Container/Container'
import LoginDev from './(components)/LoginDev/LoginDev'
import LoginHeader from './(components)/LoginHeader/LoginHeader'
import LoginHunter from './(components)/LoginHunter/LoginHunter'

const LoginPage = () => {
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
