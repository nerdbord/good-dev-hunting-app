// components
import { GithubLoginButton } from '@/app/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { LinkedInLoginButton } from '@/app/(auth)/(components)/LinkedInLoginButton/LinkedInLoginButton'
import Box from '@/components/Box/Box'

const LoginDev = () => {
  return (
    <Box>
      <h2>Login as IT specialist</h2>
      <p>
        Login with authorised Github profile, get found by hunters and also hunt
        for fellow specialist.
      </p>
      <GithubLoginButton label="Login with Github" />
      <LinkedInLoginButton label="Login with LinkedIn" />
    </Box>
  )
}

export default LoginDev
