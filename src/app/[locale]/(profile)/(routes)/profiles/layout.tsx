import AppHeader from '@/app/[locale]/(profile)/(components)/AppHeader/AppHeader'
import { FiltersWithData } from '@/app/[locale]/(profile)/(components)/Filters/FiltersWithData'
import { Container } from '@/components/Container/Container'
import VisitorBanner from '@/components/VisitorBanner/VisitorBanner'
import React from 'react'

export default async function ProfilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <AppHeader />
      <VisitorBanner />
      <Container>
        <FiltersWithData />
        {children}
      </Container>
    </main>
  )
}
