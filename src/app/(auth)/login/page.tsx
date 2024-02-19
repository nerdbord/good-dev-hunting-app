import styles from './page.module.scss'

// components
import { Container } from '@/components/Container/Container'
import LandingHeader from '@/components/landing-page/LandingHeader/LandingHeader'
import LoginDev from './(components)/LoginDev/LoginDev'
import LoginHunter from './(components)/LoginHunter/LoginHunter'

const LoginPage = () => {
  return (
    <>
      <LandingHeader /> {/* TODO - replace header */}
      <Container>
        <div className={styles.pageContent}>
          <LoginDev />
          <LoginHunter />
        </div>
      </Container>
    </>
  )
}

export default LoginPage
