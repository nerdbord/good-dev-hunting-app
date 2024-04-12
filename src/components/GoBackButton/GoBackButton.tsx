'use client'
import { useProfiles } from '@/app/(profile)/(components)/ProfilesProvider'
import { useRouter } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import styles from './GoBackButton.module.scss'

interface GoBackButtonProps {
  href?: string
}

export const GoBackButton = ({
  children,
  href,
}: PropsWithChildren<GoBackButtonProps>) => {
  const router = useRouter()
  const { handleFetchProfiles } = useProfiles()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      handleFetchProfiles()
      router.back()
    }
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
