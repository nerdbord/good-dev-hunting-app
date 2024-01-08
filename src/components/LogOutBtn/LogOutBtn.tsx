'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import styles from './LogOutBtn.module.scss'
import { AppRoutes } from '@/utils/routes'
import { usePathname } from 'next/navigation'

const LogOutBtn = () => {
  const path = usePathname()

  if (
    path.includes(AppRoutes.myProfile) ||
    path.includes(AppRoutes.userProfile)
  ) {
    return null
  }

  return (
    <div>
      <button className={styles.logout} onClick={() => signOut()}>
        Log out
      </button>
    </div>
  )
}

export default LogOutBtn
