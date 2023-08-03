'use client'
import React, { PropsWithChildren } from 'react'
import styles from './GoBackButton.module.scss'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'

interface GoBackButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const GoBackButton = ({ children }: PropsWithChildren<GoBackButtonProps>) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(AppRoutes.home)
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
