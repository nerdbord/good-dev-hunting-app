import ModerationProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'
import { findAllApprovedProfiles } from '@/app/(profile)/_actions/queries/findAllApprovedProfiles'

export default async function ModerationProfileList() {
  const profiles = await findAllApprovedProfiles()

  return <ModerationProfilesWithFilter />
}
