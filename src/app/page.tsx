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

const Page: React.FC = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <LandingHeader />
      <main className={styles.landing_background}>
        <LandingContainer>
          <Hero />
          <HowItWorks />
          <UseYourProfile />
          <MeetTeam />
          {/* @ts-expect-error Server Component */}
          <TalentSection />
          <FAQSection />
        </LandingContainer>
      </main>
      <LandingFooter />
    </>
  )
}
export default Page
