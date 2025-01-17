'use client'

import ProfileCard from '@/app/[locale]/(profile)/(components)/ProfileCard/ProfileCard'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './Hero.module.scss'

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
            <div className={styles[frameClass]} key={profile.id}>
              <Link
                href={`${AppRoutes.profile}/${profile.slug}`}
                className={`${styles.frameWrapper}`}
              >
                <ProfileCard profile={profile} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
