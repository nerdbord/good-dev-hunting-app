import HunterHeader from '@/components/hunter-landing/HunterHeader/HunterHeader'
import { Container } from '@gdh/ui-system'
import React from 'react'

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <HunterHeader />
      <Container>{children}</Container>
    </main>
  )
}
