'use client'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useEffect, type PropsWithChildren } from 'react'
import styles from './UserProfilePage.module.scss'

type UserProfileProps = PropsWithChildren & {
  profileId: string
}

export const UserProfilePage = ({ children, profileId }: UserProfileProps) => {
  const { runAsync } = useAsyncAction()
  const { markProfileAsVisited, setProfile, profile, resetProfile } =
    useProfilesStore((state) => state)

  useEffect(() => {
    setProfile(profileId)

    return () => {
      resetProfile()
    }
  }, [profileId])

  useEffect(() => {
    runAsync(async () => {
      await markProfileAsVisited()
    })
  }, [profile])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
