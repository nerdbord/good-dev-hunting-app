import { FiltersWithData } from '@/app/[locale]/(profile)/(components)/Filters/FiltersWithData'
import VisitorBanner from '@/components/VisitorBanner/VisitorBanner'
import { Container } from '@gdh/ui-system'
import React from 'react'
import Header from '../../(components)/Header/Header'

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
