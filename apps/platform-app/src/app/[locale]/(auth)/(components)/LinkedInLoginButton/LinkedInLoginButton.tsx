'use client'
import GithubIcon from '@/assets/icons/GithubIcon'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
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
          callbackUrl: AppRoutes.githubOAuth,
        })
      }}
      variant={'secondary'}
    >
      {props.label ? props.label : 'Login LinkedIn'}
      <div className={styles.iconBox}>
        <GithubIcon />
      </div>
    </Button>
  )
}
