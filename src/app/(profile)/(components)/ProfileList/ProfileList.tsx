import ProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ProfilesWithFilter'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()

  return <ProfilesWithFilter data={profiles} />
}
export default ProfileList
