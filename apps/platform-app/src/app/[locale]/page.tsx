import { Container } from '@/components/Container/Container'
import FAQSection from '@/components/landing-page/FAQSection/FAQSection'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'
import LandingFooter from '@/components/landing-page/LandingFooter/LandingFooter'
import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'
import TalentSection from '@/components/landing-page/TalentSection/TalentSection'
import UseYourProfile from '@/components/landing-page/UseYourProfile/UseYourProfile'
import React from 'react'
import styles from '../page.module.scss'
import Header from './(profile)/(components)/Header/Header'
import { ProfilesStoreProvider } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'

const Page: React.FC = async () => {
  const fetchedProfiles = await findAllApprovedProfiles()

  return (
    <ProfilesStoreProvider initialProfiles={fetchedProfiles}>
      <main className={styles.landing_background}>
        <Header buttonsVariant={'main'} />
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
    </ProfilesStoreProvider>
  )
}

export default Page
