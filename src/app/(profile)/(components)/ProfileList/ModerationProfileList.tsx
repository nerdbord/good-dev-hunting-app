import ModerationProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'
import { findAllPublishedProfiles } from '@/app/(profile)/_actions/findAllPublishedProfiles'

export default async function ModerationProfileList() {
  const profiles = await findAllPublishedProfiles()

  return <ModerationProfilesWithFilter profiles={profiles} />
}
