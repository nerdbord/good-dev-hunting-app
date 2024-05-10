import Header from '@/app/(profile)/(components)/Header/Header'
import { Container } from '@/components/Container/Container'
import ErrorBox from './(components)/ErrorBox'

const LoginErrorPage = () => {
  return (
    <>
      <Header />
      <Container>
        <ErrorBox />
      </Container>
    </>
  )
}

export default LoginErrorPage
