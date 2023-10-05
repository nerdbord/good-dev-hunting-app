import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import ProfilesWithFilter from '@/components/ProfileList/ProfilesWithFilter'
import { Container } from '@/components/Container/Container'

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()

  return (
    <div className={styles.mainContainer}>
      <Container>
        <div className={styles.profileListCont}>
          <ProfilesWithFilter data={profiles} />
        </div>
      </Container>
    </div>
  )
}
export default ProfileList
