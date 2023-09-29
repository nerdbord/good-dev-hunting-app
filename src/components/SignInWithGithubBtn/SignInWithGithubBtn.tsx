'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import GithubIcon from '@/assets/icons/GithubIcon'
import { signIn } from 'next-auth/react'

const SignInWithGithubBtn = () => {
  return (
    <Button onClick={() => signIn('github')} variant={'secondary'}>
      Login
      <GithubIcon />
    </Button>
  )
}

export default SignInWithGithubBtn
