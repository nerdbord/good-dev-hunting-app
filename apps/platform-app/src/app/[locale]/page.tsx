import { Container } from '@gdh/ui-system'

import { findAllTeamProfiles } from '@/app/[locale]/(profile)/_actions/queries/findAllTeamProfiles'
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

import { ThemeSwitcher } from './(profile)/(components)/ThemeSwitcher/ThemeSwitcher'
import styles from './page.module.scss'

export default async function HunterLandingPage() {
  const teamProfiles = await findAllTeamProfiles()

  return (
    <main className={styles.hunter_landing}>
      <ThemeSwitcher />
      <Container>
        <HunterHeader />
        <HunterHero />
        <HunterRiskReducers />
        <HunterHowItWorks />
        <HunterWhyWorth />
        <HunterReviews />
        <HunterTeam teamProfiles={teamProfiles} />
        <HunterCTA />
        <HunterFAQ />
        <HunterFooter />
      </Container>
    </main>
  )
}
