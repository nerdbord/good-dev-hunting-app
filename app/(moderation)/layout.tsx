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
      {/* @ts-expect-error Server Component */}
      <DashboardHeader />
      <Container>{children}</Container>
    </>
  )
}
