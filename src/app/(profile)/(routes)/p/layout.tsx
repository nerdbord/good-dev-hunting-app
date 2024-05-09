import { Container } from '@/components/Container/Container'
import React from 'react'
import Header from '../../(components)/Header/Header'

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}
