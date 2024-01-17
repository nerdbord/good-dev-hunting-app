import React from 'react'
import styles from './page.module.scss'
import { Container } from '@/components/Container/Container'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'

import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'

const Page: React.FC = () => {
  return (
    <Container>

      <MeetTeam />

    </Container>

  )
}
export default Page
