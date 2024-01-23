import React from 'react'
import { Container } from '@/components/Container/Container'
import AppHeader from '@/components/Headers/AppHeader/AppHeader'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AppHeader />
      <Container>{children}</Container>
    </main>
  )
}
