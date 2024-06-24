import { Container } from '@gdh/ui-system'
import React from 'react'
import Header from '../../(components)/Header/Header'

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      <Container>{children}</Container>
    </main>
  )
}
