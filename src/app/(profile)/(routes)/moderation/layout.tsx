import DashboardHeader from '@/app/(profile)/(routes)/moderation/(components)/DashboardHeader/DashboardHeader'
import { findAllProfiles } from '@/app/(profile)/_actions'
import { ModerationProvider } from '@/app/(profile)/_providers/Moderation.provider'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default async function ModerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fetchedProfiles = await findAllProfiles()
  return (
    <ModerationProvider initialProfiles={fetchedProfiles}>
      <DashboardHeader />
      <Container>{children}</Container>
    </ModerationProvider>
  )
}
