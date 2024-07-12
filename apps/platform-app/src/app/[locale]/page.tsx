import { findAllApprovedProfiles } from '@/app/[locale]/(profile)/_actions'
import { ProfilesStoreProvider } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import {
  FAQSection,
  Hero,
  HowItWorks,
  LandingFooter,
  MeetTeam,
  TalentSection,
  UseYourProfile,
} from '@/components/landing-page'
import { Container } from '@gdh/ui-system'
import styles from '../page.module.scss'
import Header from './(profile)/(components)/Header/Header'

export default async function LandingPage() {
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
