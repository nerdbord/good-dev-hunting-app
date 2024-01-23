import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import ProfilesWithFilter from '@/components/ProfileList/ProfilesWithFilter'

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()

  return (
    <div className={styles.profileListCont}>
      <ProfilesWithFilter data={profiles} />
    </div>
  )
}
export default ProfileList
