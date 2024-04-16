import DashboardHeader from '@/app/(profile)/(routes)/moderation/(components)/DashboardHeader/DashboardHeader'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default function ModerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      <Container>{children}</Container>
    </>
  )
}
