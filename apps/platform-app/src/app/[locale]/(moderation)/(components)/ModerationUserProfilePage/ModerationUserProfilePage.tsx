'use client'
import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { useEffect, type PropsWithChildren } from 'react'
import styles from './ModerationUserProfilePage.module.scss'
import { getModerationCurrentState } from '@/app/[locale]/(moderation)/moderation.helpers'

type ModerationUserProfileProps = PropsWithChildren & {
  profileId: string
}

export const ModerationUserProfilePage = ({
  children,
  profileId,
}: ModerationUserProfileProps) => {
  const { setModerationProfile, resetModerationProfile } =
    useModerationProfilesStore(getModerationCurrentState)

  useEffect(() => {
    setModerationProfile(profileId)

    return () => {
      resetModerationProfile()
    }
  }, [profileId])

  return <div className={styles.wrapper}>{children}</div>
}
