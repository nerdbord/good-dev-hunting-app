import ModerationProfilesWithFilter from '@/components/ProfileList/ModerationProfilesWithFilter'
import { getAllPublishedProfilesPayload } from '@/backend/profile/profile.service'

export default async function ModerationProfileList() {
  const profiles = await getAllPublishedProfilesPayload()

  return <ModerationProfilesWithFilter profiles={profiles} />
}
