import AppHeader from '@/app/(profile)/(components)/AppHeader/AppHeader'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AppHeader />
      <Container>{children}</Container>
    </main>
  )
}
