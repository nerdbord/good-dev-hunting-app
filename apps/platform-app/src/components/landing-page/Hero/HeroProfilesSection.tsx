'use client'

import { ProfileListItem } from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/[locale]/(profile)/_providers/Profiles.provider'
import { useMemo } from 'react'
import styles from './Hero.module.scss'

export const HeroProfilesSection = () => {
  const { allProfiles } = useProfiles()
  const selectedProfiles = useMemo(() => {
    return allProfiles.sort(() => 0.5 - Math.random()).slice(0, 3)
  }, [allProfiles])

  const [first, second, third] = selectedProfiles

  return (
    <div className={styles.right}>
      <div className={styles.section}>
        {first && (
          <div className={styles.frame1}>
            <ProfileListItem key={first.id} data={first} />
          </div>
        )}
        {second && (
          <div className={styles.frame2}>
            <ProfileListItem key={second.id} data={second} />
          </div>
        )}
        {third && (
          <div className={styles.frame3}>
            <ProfileListItem key={third.id} data={third} />
          </div>
        )}
      </div>
    </div>
  )
}
