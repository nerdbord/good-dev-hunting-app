import ModerationProfilesWithFilter from '@/app/[locale]/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'
import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions/queries/findAllApprovedProfiles'

export default async function ModerationProfileList() {
  const profiles = await findAllApprovedProfiles()

  return <ModerationProfilesWithFilter />
}
