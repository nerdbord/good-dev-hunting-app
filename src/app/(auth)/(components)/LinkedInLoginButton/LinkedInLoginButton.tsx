'use client'
import GithubIcon from '@/assets/icons/GithubIcon'
import { Button } from '@/components/Button/Button'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import styles from '../GithubLoginButton/GithubLoginButton.module.scss'

interface GithubLoginButtonProps {
  label?: string
}

export const LinkedInLoginButton = (props: GithubLoginButtonProps) => {
  const [isCalled, setIsCalled] = useState(false)
  return (
    <Button
      disabled={isCalled}
      onClick={() => {
        setIsCalled(true)
        signIn('linkedin', {
          callbackUrl: '/api/auth/callback/linkedi',
        })
      }}
      variant={'secondary'}
    >
      {props.label ? props.label : 'Login'}
      <div className={styles.iconBox}>
        <GithubIcon />
      </div>
    </Button>
  )
}
