import { Container } from '@gdh/ui-system'

import BenefitsSection from '@/components/hunter-landing/BenefitsSection/BenefitsSection'
import CTASection from '@/components/hunter-landing/CTASection/CTASection'
import HowItWorksHunter from '@/components/hunter-landing/HowItWorksHunter/HowItWorksHunter'
import HunterHeader from '@/components/hunter-landing/HunterHeader/HunterHeader'
import HunterHero from '@/components/hunter-landing/HunterHero/HunterHero'
import SuccessStories from '@/components/hunter-landing/SuccessStories/SuccessStories'
import styles from '../page.module.scss'

export default async function HunterLandingPage() {
  return (
    <main className={styles.landing_background}>
      <Container>
        <HunterHeader />
        <HunterHero />
        <HowItWorksHunter />
        <BenefitsSection />
        <SuccessStories />
        <CTASection />
      </Container>
    </main>
  )
}
