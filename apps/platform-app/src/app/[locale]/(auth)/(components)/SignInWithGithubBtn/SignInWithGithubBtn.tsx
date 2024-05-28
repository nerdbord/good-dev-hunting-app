'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { GithubIcon } from '@gdh/ui-system/icons'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const SignInWithGithubBtn = () => {
  const [isCalled, setIsCalled] = useState(false)
  return (
    <Button
      onClick={() => {
        setIsCalled(true)
        signIn('github', { callbackUrl: AppRoutes.githubOAuth })
      }}
      disabled={isCalled}
      variant={'secondary'}
    >
      Login
      <GithubIcon />
    </Button>
  )
}

export default SignInWithGithubBtn
