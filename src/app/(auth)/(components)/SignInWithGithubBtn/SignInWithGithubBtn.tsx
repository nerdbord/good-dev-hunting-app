'use client'
import GithubIcon from '@/assets/icons/GithubIcon'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { signIn } from 'next-auth/react'

const SignInWithGithubBtn = () => {
  return (
    <Button
      onClick={() => signIn('github', { callbackUrl: AppRoutes.githubOAuth })}
      variant={'secondary'}
    >
      Login
      <GithubIcon />
    </Button>
  )
}

export default SignInWithGithubBtn
