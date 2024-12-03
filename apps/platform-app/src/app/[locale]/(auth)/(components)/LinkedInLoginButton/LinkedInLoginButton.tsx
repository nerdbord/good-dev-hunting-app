'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { LinkedIn } from '@gdh/ui-system/icons'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { type Roles } from '../../_models/User.model'
import styles from '../GithubLoginButton/GithubLoginButton.module.scss'

interface LinkedInLoginButtonProps {
  label?: string
  role: Roles.SPECIALIST | Roles.HUNTER
}

export const LinkedInLoginButton = (props: LinkedInLoginButtonProps) => {
  const [isCalled, setIsCalled] = useState(false)
  return (
    <Button
      disabled={isCalled}
      onClick={() => {
        setIsCalled(true)
        signIn('linkedin', {
          callbackUrl: `${AppRoutes.oAuth}?role=${props.role}`,
        })
      }}
      variant={'secondary'}
    >
      {props.label ? props.label : 'Login with LinkedIn'}
      <div className={styles.iconBox}>
        <LinkedIn />
      </div>
    </Button>
  )
}
