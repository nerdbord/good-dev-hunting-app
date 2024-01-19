import React from 'react'
import { Container } from '@/components/Container/Container'
import TalentSection from '@/components/landing-page/TalentSection/TalentSection'

const Page: React.FC = () => {
  return (
    <Container>
      {/* @ts-expect-error Server Component */}
      <TalentSection />
    </Container>
  )
}
export default Page
