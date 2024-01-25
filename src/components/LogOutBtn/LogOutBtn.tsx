'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import styles from './LogOutBtn.module.scss'
import { AppRoutes } from '@/utils/routes'

const LogOutBtn = () => {
  return (
    <div>
      <button
        className={styles.logout}
        onClick={() => signOut({ callbackUrl: AppRoutes.home })}
      >
        Log out
      </button>
    </div>
  )
}

export default LogOutBtn
