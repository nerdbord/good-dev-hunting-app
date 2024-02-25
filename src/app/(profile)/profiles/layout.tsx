import AppHeader from '@/app/(profile)/(components)/AppHeader/AppHeader'
import { Container } from '@/components/Container/Container'
import React from 'react'
import VisitorBanner from '../(components)/VisitorBanner/VisitorBanner'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AppHeader />
      <VisitorBanner />
      <Container>{children}</Container>
    </main>
  )
}
