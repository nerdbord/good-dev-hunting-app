import { FiltersWithData } from '@/app/[locale]/(profile)/(components)/Filters/FiltersWithData'
import ProfileList from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileList'
import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
import { ProfilesStoreProvider } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'

export default async function Profiles() {
  const fetchedProfiles = await findAllApprovedProfiles()

  return (
    <ProfilesStoreProvider initialProfiles={fetchedProfiles}>
      <FiltersWithData />
      <ProfileList />
    </ProfilesStoreProvider>
  )
}
