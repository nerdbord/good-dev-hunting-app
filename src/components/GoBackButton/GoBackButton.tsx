'use client'
import React, { PropsWithChildren } from 'react'
import styles from './GoBackButton.module.scss'
import { useRouter } from 'next/navigation'
export const GoBackButton = ({ children }: PropsWithChildren<object>) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <div>
      <button className={styles.back} onClick={handleClick}>
        {children}
      </button>
    </div>
  )
}

export default GoBackButton
