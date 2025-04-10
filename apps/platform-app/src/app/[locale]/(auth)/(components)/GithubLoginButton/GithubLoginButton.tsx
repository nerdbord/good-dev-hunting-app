'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { GithubIcon } from '@gdh/ui-system/icons'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { type Roles } from '../../_models/User.model'
import styles from './GithubLoginButton.module.scss'

interface GithubLoginButtonProps {
  label?: string
  role: Roles.SPECIALIST | Roles.HUNTER
  redirect?: boolean
  redirectTo?: string
}

export const GithubLoginButton = (props: GithubLoginButtonProps) => {
  const [isCalled, setIsCalled] = useState(false)
  return (
    <Button
      disabled={isCalled}
      onClick={() => {
        setIsCalled(true)
        signIn('github', {
          callbackUrl: `${AppRoutes.oAuth}?role=${props.role}`,
          redirect: props.redirect,
          redirectTo: props.redirectTo,
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
