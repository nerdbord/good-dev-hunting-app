import { Container } from '@/components/Container/Container'
import FAQSection from '@/components/landing-page/FAQSection/FAQSection'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'
import LandingFooter from '@/components/landing-page/LandingFooter/LandingFooter'
import LandingHeader from '@/components/landing-page/LandingHeader/LandingHeader'
import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'
import TalentSection from '@/components/landing-page/TalentSection/TalentSection'
import UseYourProfile from '@/components/landing-page/UseYourProfile/UseYourProfile'
import React from 'react'
import styles from './page.module.scss'

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
      </Container>
      <LandingFooter />
    </main>
  )
}
export default Page
