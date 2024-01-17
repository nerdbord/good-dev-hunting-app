import React from 'react'
import { Container } from '@/components/Container/Container'
import AppHeader from '@/components/Headers/AppHeader/AppHeader'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* @ts-expect-error Server Component } */}
      <AppHeader />
      <Container>{children}</Container>
    </main>
  )
}
