'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { GithubIcon } from '@gdh/ui-system/icons'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import styles from './GithubLoginButton.module.scss'

interface GithubLoginButtonProps {
  label?: string
}

export const GithubLoginButton = (props: GithubLoginButtonProps) => {
  const [isCalled, setIsCalled] = useState(false)
  return (
    <Button
      disabled={isCalled}
      onClick={() => {
        setIsCalled(true)
        signIn('github', {
          callbackUrl: AppRoutes.githubOAuth,
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
