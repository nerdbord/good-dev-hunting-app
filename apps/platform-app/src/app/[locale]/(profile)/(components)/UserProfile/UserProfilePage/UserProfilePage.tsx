'use client'
import { createOrUpdateProfileView } from '@/app/[locale]/(profile)/_actions'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useEffect, type PropsWithChildren } from 'react'
import styles from './UserProfilePage.module.scss'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'

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
    if (profile) {
      runAsync(async () => {
        const profileView = await createOrUpdateProfileView(profile.id)

        if (profileView) {
          markProfileAsVisited(profileView)
        }
      })
    }
  }, [profile])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
