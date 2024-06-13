import { ModerationProfilesStoreProvider } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { findAllProfiles } from '@/app/[locale]/(profile)/_actions'
import { Container } from '@/components/Container/Container'
import React from 'react'
import Header from '../../../(profile)/(components)/Header/Header'

export default async function ModerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fetchedProfiles = await findAllProfiles()

  return (
    <ModerationProfilesStoreProvider initialProfiles={fetchedProfiles}>
      <Header />
      <Container>{children}</Container>
    </ModerationProfilesStoreProvider>
  )
}
