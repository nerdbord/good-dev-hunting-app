'use client'
import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
import styles from './ProfileList.module.scss'

const ProfileList = () => {
  const { filteredProfiles: profiles } = useProfiles()

  const sortedProfiles = profiles.sort((a, b) => {
    if (a.hourlyRateMin && !b.hourlyRateMin) return -1
    if (!a.hourlyRateMin && b.hourlyRateMin) return 1
    else return 0
  })

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
        {sortedProfiles.map((profile) => (
          <ProfileListItem
            key={profile.id}
            data={profile}
            isHiddenName={true}
          />
        ))}
      </div>
    </div>
  )
}
export default ProfileList
