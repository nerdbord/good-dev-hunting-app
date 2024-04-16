'use client'
import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
import Loading from '@/app/loading'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './ProfileList.module.scss'

const ProfileList = () => {
  const { filteredProfiles: profiles, isFetching } = useProfiles()

  if (isFetching && profiles.length === 0) {
    return (
      <div className={styles.profileCards}>
        <Loading />
      </div>
    )
  }

  if (profiles.length === 0 && !isFetching) {
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
        {profiles.map((profile) => (
          <Link
            key={profile.id}
            href={`${AppRoutes.profile}/${profile.githubUsername}`}
          >
            <ProfileListItem key={profile.id} data={profile} />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default ProfileList
