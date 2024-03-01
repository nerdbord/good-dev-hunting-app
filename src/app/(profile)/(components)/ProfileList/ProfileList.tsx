import ProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ProfilesWithFilter'
import { ProfileModel } from '@/app/(profile)/types'

const ProfileList = async ({ profiles }: { profiles: ProfileModel[] }) => {
  // const profiles = await getPublishedProfilesPayload()
  // const shuffledProfiles = shuffleArray(profiles)

  return <ProfilesWithFilter data={profiles} />
}
export default ProfileList
