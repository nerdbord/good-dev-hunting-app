import React from 'react'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import ProfilesWithFilter from '@/components/ProfileList/ProfilesWithFilter'

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()

  console.log('profiles', profiles)

  return <ProfilesWithFilter data={profiles} />
}
export default ProfileList
