'use client'

import { useMemo } from 'react'
import styles from './Hero.module.scss'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { ProfileListItem } from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileListItem'

export const HeroProfilesSection = () => {
  const { profiles } = useProfilesStore((state) => state)

  const selectedProfiles = useMemo(() => {
    return profiles.sort(() => 0.5 - Math.random()).slice(0, 3)
  }, [profiles])

  return (
    <div className={styles.right}>
      <div className={styles.section}>
        {selectedProfiles.map((profile, idx) => {
          const frameClass = `frame${idx + 1}`

          return (
            <div className={styles[frameClass]}>
              <ProfileListItem key={profile.id} profile={profile} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
