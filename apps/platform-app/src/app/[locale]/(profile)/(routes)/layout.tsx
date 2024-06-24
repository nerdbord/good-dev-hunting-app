import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
import { ProfilesStoreProvider } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { type PropsWithChildren } from 'react'

export default async function ProfileLayout({ children }: PropsWithChildren) {
  const fetchedProfiles = await findAllApprovedProfiles()

  return (
    <ProfilesStoreProvider initialProfiles={fetchedProfiles}>
      {children}
    </ProfilesStoreProvider>
  )
}
