'use client'
import GithubIcon from '@/assets/icons/GithubIcon'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import styles from './GithubLoginButton.module.scss'

export const GithubLoginButton = () => {
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
      Login
      <div className={styles.iconBox}>
        <GithubIcon />
      </div>
    </Button>
  )
}
