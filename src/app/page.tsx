import React from 'react'
import styles from './page.module.scss'
import { LandingContainer } from '@/components/landing-page/LandingContainer/LandingContainer'
import LandingHeader from '@/components/landing-page/LandingHeader/LandingHeader'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'
import UseYourProfile from '@/components/landing-page/UseYourProfile/UseYourProfile'
import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'
import TalentSection from '@/components/landing-page/TalentSection/TalentSection'
import FAQSection from '@/components/landing-page/FAQSection/FAQSection'
import LandingFooter from '@/components/landing-page/LandingFooter/LandingFooter'
import { Container } from '@/components/Container/Container'

const Page: React.FC = () => {
  return (
    <main className={styles.landing_background}>
      <LandingHeader />
      <Container>
        <Hero />
        <HowItWorks />
        <UseYourProfile />
        <MeetTeam />
        <TalentSection />
        <FAQSection />
        <LandingFooter />
      </Container>
    </main>
  )
}
export default Page
