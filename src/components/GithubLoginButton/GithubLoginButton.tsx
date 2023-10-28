'use client'
import { Button } from '@/components/Button/Button'
import { signIn } from 'next-auth/react'
import GithubIcon from '@/assets/icons/GithubIcon'
import React from 'react'
import { AppRoutes } from '@/utils/routes'

export const GithubLoginButton = () => {
  return (
    <Button
      onClick={() =>
        signIn('github', {
          callbackUrl: AppRoutes.githubOAuth,
        })
      }
      variant={'secondary'}
    >
      Login
      <GithubIcon />
    </Button>
  )
}
