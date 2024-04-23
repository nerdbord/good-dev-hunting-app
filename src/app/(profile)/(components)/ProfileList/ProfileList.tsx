'use client'
import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import styles from './ProfileList.module.scss'

const ProfileList = () => {
  const { filteredProfiles: profiles } = useProfiles()
  const { data: session } = useSession()

  if (profiles.length === 0) {
    return (
      <div className={styles.profileCards}>
        <div className={styles.profileListCont}>
          <p>No matching profiles found</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.profileCards}>
      <div className={styles.profileListCont}>
        {profiles.map((profile) =>
          session?.user ? (
            <ProfileListItem
              key={profile.id}
              data={profile}
              href={`${AppRoutes.profile}/${profile.githubUsername}`}
            />
          ) : (
            <ProfileListItem
              key={profile.id}
              data={{
                ...profile,
                fullName: profile.fullName.slice(0, 1) + '.',
              }}
              href={`${AppRoutes.profile}/${profile.githubUsername}`}
              isHiddenName={true}
            />
          ),
        )}
      </div>
    </div>
  )
}
export default ProfileList
