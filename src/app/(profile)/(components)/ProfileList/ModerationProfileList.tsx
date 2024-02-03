import ModerationProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'
import { getAllPublishedProfilesPayload } from '@/backend/profile/profile.service'

export default async function ModerationProfileList() {
  const profiles = await getAllPublishedProfilesPayload()

  return <ModerationProfilesWithFilter profiles={profiles} />
}
