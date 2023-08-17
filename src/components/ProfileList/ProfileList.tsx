import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import ProfilesWithFilter from '@/components/ProfileList/ProfilesWithFilter'

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()

  const filteredCount = profiles.length

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>Profiles found ({filteredCount})</div>
      <div className={styles.profileListCont}>
        <ProfilesWithFilter data={profiles} />
      </div>
    </div>
  )
}
export default ProfileList
