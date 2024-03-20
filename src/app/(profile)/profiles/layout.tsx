import AppHeader from '@/app/(profile)/(components)/AppHeader/AppHeader'
import { FiltersWithData } from '@/app/(profile)/(components)/Filters/FiltersWithData'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AppHeader />
      <Container>
        <FiltersWithData />
        {children}
      </Container>
    </main>
  )
}
