import DashboardHeader from '@/app/(profile)/moderation/(components)/DashboardHeader/DashboardHeader'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default function DashboardLayout({
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
