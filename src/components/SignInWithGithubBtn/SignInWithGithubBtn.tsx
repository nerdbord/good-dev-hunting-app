'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import GithubIcon from '@/assets/icons/GithubIcon'
import { signIn } from 'next-auth/react'
import { AppRoutes } from '@/utils/routes'

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
