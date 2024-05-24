'use client'
import { createOrUpdateProfileView } from '@/app/[locale]/(profile)/_actions'
import { useProfileStore } from '@/app/[locale]/(profile)/_providers/profile-store.provider'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useSession } from 'next-auth/react'
import { useEffect, type PropsWithChildren } from 'react'
import styles from './UserProfilePage.module.scss'

export const UserProfilePage = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession()
  const { runAsync } = useAsyncAction()
  const { markProfileAsVisited, profile } = useProfileStore((state) => state)

  useEffect(() => {
    if (session && session.user) {
      runAsync(async () => {
        const profileView = await createOrUpdateProfileView(
          session.user.id,
          profile.id,
        )

        if (profileView) {
          markProfileAsVisited(profileView)
        }
      })
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
