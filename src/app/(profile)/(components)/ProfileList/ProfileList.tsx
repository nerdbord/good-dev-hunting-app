import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { type ProfileModel } from '@/app/(profile)/types'
import styles from './ProfileList.module.scss'

const ProfileList = ({ profiles }: { profiles: ProfileModel[] }) => {
  // const shuffledProfiles = shuffleArray(profiles)

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
        {profiles.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}
export default ProfileList
