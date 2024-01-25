import React from 'react'
import { Container } from '@/components/Container/Container'
import DashboardHeader from '@/components/Headers/DashboardHeader/DashboardHeader'

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
