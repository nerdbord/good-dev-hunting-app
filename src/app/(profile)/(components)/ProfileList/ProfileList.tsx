'use client'
import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
import { sortProfilesBySalary } from '@/app/(profile)/profile.helpers'
import Loader from '@/components/Loader/Loader'
import { useSession } from 'next-auth/react'
import styles from './ProfileList.module.scss'

const ProfileList = () => {
  const { filteredProfiles: profiles } = useProfiles()
  const { status } = useSession()

  const sortedProfiles = profiles.sort(sortProfilesBySalary)

  if (status === 'loading') {
    return <Loader />
  }

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
