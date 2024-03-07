'use client'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import styles from './GoBackButton.module.scss'

interface GoBackButtonProps {
  href?: string
}

export const GoBackButton = ({
  children,
  href,
}: PropsWithChildren<GoBackButtonProps>) => {
  const router = useRouter()

  const handleClick = () => {
    href ? router.push(href) : router.back()
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
