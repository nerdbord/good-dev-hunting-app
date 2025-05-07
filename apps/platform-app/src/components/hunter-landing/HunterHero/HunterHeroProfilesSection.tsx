import ProfileCard from '@/app/[locale]/(profile)/(components)/ProfileCard/ProfileCard'
import { findRandomProfiles } from '@/app/[locale]/(profile)/_actions/queries/findRandomProfiles'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './HunterHero.module.scss'

export const HunterHeroProfilesSection = async () => {
  const selectedProfiles = await findRandomProfiles(3)

  return (
    <div className={styles.right}>
      <div className={styles.section}>
        {selectedProfiles.map((profile, idx) => {
          const frameClass = `frame${idx + 1}`

          return (
            <div className={styles[frameClass]} key={profile.id}>
              <Link
                href={`${AppRoutes.profile}/${profile.githubUsername}`}
                className={styles.frameWrapper}
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
