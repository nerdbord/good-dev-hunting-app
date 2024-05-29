import { Container } from '@/components/Container/Container'
import VisitorBanner from '@/components/VisitorBanner/VisitorBanner'
import React from 'react'
import Header from '../../(components)/Header/Header'
import { FiltersWithData } from '@/app/[locale]/(profile)/(components)/Filters/FiltersWithData'

export default async function ProfilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header buttonsVariant="profiles" />
      <VisitorBanner />
      <Container>
        <FiltersWithData />
        {children}
      </Container>
    </main>
  )
}
