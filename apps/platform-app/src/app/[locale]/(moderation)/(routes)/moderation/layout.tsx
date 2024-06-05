import { findAllProfiles } from '@/app/[locale]/(profile)/_actions'
import { ModerationProvider } from '@/app/[locale]/(profile)/_providers/Moderation.provider'
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
    <ModerationProvider initialProfiles={fetchedProfiles}>
      <Header />
      <Container>{children}</Container>
    </ModerationProvider>
  )
}
