import { getAllPublishedProfilesPayload } from '@/backend/profile/profile.service'
import ModerationProfilesWithFilter from '@/components/ProfileList/ModerationProfilesWithFilter'

export default async function ModerationProfileList() {
  const profiles = await getAllPublishedProfilesPayload()

  return <ModerationProfilesWithFilter profiles={profiles} />
}
