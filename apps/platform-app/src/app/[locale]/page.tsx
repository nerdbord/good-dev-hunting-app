import { Container } from '@gdh/ui-system'

import { HunterFAQ } from '@/components/hunter-landing/HunterFAQ/HunterFAQ'

import styles from './page.module.scss'

export default async function HunterLandingPage() {
  return (
    <main className={styles.hunter_landing}>
      <Container>
        <HunterFAQ />
        {/*         <HunterHeader />
        <HunterHero />
        <HunterRiskReducers />
        <HunterHowItWorks />
        <HunterWhyWorth />
        <HunterReviews />
        <HunterTeam />
        <HunterCTA />
        <HunterFAQ />
        <HunterFooter /> */}
      </Container>
    </main>
  )
}
