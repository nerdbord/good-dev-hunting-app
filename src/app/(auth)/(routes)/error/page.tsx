import { Container } from '@/components/Container/Container'
import LoginHeader from '../signin/(components)/LoginHeader/LoginHeader'
import ErrorBox from './(components)/ErrorBox'

const LoginErrorPage = () => {
  return (
    <>
      <LoginHeader />
      <Container>
        <ErrorBox />
      </Container>
    </>
  )
}

export default LoginErrorPage
