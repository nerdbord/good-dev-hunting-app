import { Container } from '@/components/Container/Container'
import FAQSection from '@/components/landing-page/FAQSection/FAQSection'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'
import LandingFooter from '@/components/landing-page/LandingFooter/LandingFooter'
import LandingHeader from '@/components/landing-page/LandingHeader/LandingHeader'
import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'
import TalentSection from '@/components/landing-page/TalentSection/TalentSection'
import UseYourProfile from '@/components/landing-page/UseYourProfile/UseYourProfile'
import { useTranslations } from 'next-intl'

export default function IndexPage() {
  const t = useTranslations('Index')
  return (
    <main>
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
