import DashboardHeader from '@/app/(profile)/(routes)/moderation/(components)/DashboardHeader/DashboardHeader'
import { ModerationProvider } from '@/app/(profile)/_providers/Moderation.provider'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default function ModerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ModerationProvider>
      <DashboardHeader />
      <Container>{children}</Container>
    </ModerationProvider>
  )
}
