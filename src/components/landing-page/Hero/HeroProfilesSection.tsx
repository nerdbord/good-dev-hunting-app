'use client'
import ProfileCard from '@/app/(profile)/(components)/ProfileCard/ProfileCard'

import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
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
          <Link
            key={first.id}
            href={`${AppRoutes.profile}/${first.githubUsername}`}
          >
            <div className={styles.frame1}>
              <ProfileCard data={first} />
            </div>
          </Link>
        )}
        {second && (
          <Link
            key={second.id}
            href={`${AppRoutes.profile}/${second.githubUsername}`}
          >
            <div className={styles.frame2}>
              <ProfileCard data={second} />
            </div>
          </Link>
        )}
        {third && (
          <Link
            key={third.id}
            href={`${AppRoutes.profile}/${third.githubUsername}`}
          >
            <div className={styles.frame3}>
              <ProfileCard data={third} />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
