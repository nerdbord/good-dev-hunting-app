import { Container } from '@/components/Container/Container'
import VisitorBanner from '@/components/VisitorBanner/VisitorBanner'
import React from 'react'
import Header from '../../(components)/Header/Header'
import { ProfilesStoreProvider } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
import { FiltersWithData } from '@/app/[locale]/(profile)/(components)/Filters/FiltersWithData'

export default async function ProfilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fetchedProfiles = await findAllApprovedProfiles()

  return (
    <ProfilesStoreProvider initialProfiles={fetchedProfiles}>
      <main>
        <Header buttonsVariant="profiles" />
        <VisitorBanner />
        <Container>
          <FiltersWithData />
          {children}
        </Container>
      </main>
    </ProfilesStoreProvider>
  )
}
