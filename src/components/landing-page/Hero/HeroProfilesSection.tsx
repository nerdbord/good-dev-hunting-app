'use client'

import ProfileCard from '@/app/[locale]/(profile)/(components)/ProfileCard/ProfileCard'
import { useProfiles } from '@/app/[locale]/(profile)/_providers/Profiles.provider'
import { AppRoutes } from '@/utils/routes'
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
            <ProfileCard
              data={first}
              href={`${AppRoutes.profile}/${first.githubUsername}`}
            />{' '}
          </div>
        )}
        {second && (
          <div className={styles.frame2}>
            <ProfileCard
              data={second}
              href={`${AppRoutes.profile}/${second.githubUsername}`}
            />{' '}
          </div>
        )}
        {third && (
          <div className={styles.frame3}>
            <ProfileCard
              data={third}
              href={`${AppRoutes.profile}/${third.githubUsername}`}
            />{' '}
          </div>
        )}
      </div>
    </div>
  )
}
