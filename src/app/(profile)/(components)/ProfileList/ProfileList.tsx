import ProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ProfilesWithFilter'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import shuffleArray from '@/utils/collections'

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()
  const shuffledProfiles = shuffleArray(profiles)

  return <ProfilesWithFilter data={shuffledProfiles} />
}
export default ProfileList
