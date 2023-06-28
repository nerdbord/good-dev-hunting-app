'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import styles from './LogOutBtn.module.scss'

const LogOutBtn = () => {
  return (
    <div>
      <button className={styles.logout} onClick={() => signOut()}>
        Log out
      </button>
    </div>
  )
}

export default LogOutBtn
