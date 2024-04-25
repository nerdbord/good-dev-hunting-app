import AppHeader from '@/app/(profile)/(components)/AppHeader/AppHeader'
import { Container } from '@/components/Container/Container'
import React from 'react'

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppHeader />
      <Container>{children}</Container>
    </>
  )
}
