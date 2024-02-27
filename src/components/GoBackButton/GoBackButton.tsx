'use client'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import styles from './GoBackButton.module.scss'

export const GoBackButton = ({ children }: PropsWithChildren<object>) => {
  const router = useRouter()

  const handleClick = () => {
    !document.referrer || !document.referrer.includes(window.location.hostname)
      ? router.push(AppRoutes.profiles)
      : router.back()
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
