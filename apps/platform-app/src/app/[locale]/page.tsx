import { Container } from '@gdh/ui-system'

import { HunterCTA } from '@/components/hunter-landing/HunterCTA/HunterCTA'
import { HunterFAQ } from '@/components/hunter-landing/HunterFAQ/HunterFAQ'
import { HunterFooter } from '@/components/hunter-landing/HunterFooter/HunterFooter'
import { HunterHeader } from '@/components/hunter-landing/HunterHeader/HunterHeader'
import { HunterHero } from '@/components/hunter-landing/HunterHero/HunterHero'
import { HunterHowItWorks } from '@/components/hunter-landing/HunterHowItWorks/HunterHowItWorks'
import { HunterReviews } from '@/components/hunter-landing/HunterReviews/HunterReviews'
import { HunterRiskReducers } from '@/components/hunter-landing/HunterRiskReducers/HunterRiskReducers'
import { HunterTeam } from '@/components/hunter-landing/HunterTeam/HunterTeam'
import { HunterWhyWorth } from '@/components/hunter-landing/HunterWhyWorth/HunterWhyWorth'

import styles from './page.module.scss'

export default async function HunterLandingPage() {
  return (
    <main className={styles.hunter_landing}>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '180px' }}>
          <HunterHeader />
          <HunterHero />
          <HunterRiskReducers />
          <HunterHowItWorks />
          <HunterWhyWorth />
          <HunterReviews />
          <HunterTeam />
          <HunterFAQ />
          <HunterCTA />
          <HunterFooter />
        </div>
      </Container>
    </main>
  )
}
