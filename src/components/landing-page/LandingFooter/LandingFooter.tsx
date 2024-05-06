import { Container } from '@/components/Container/Container'
import Logo from '@/components/Logo/Logo'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import styles from './LandingFooter.module.scss'

const LandingFooter = () => {
  const t = useTranslations('LandingFooter')

  return (
    <section id="LandingFooter" className={styles.footer}>
      <Container>
        <div className={styles.topBar}>
          <Logo />
          <div className={styles.contact}>
            <span className={styles.textDark}>Good Dev Hunting</span>
            <Link
              href="mailto:team@devhunting.co"
              target="_blank"
              className={`${styles.textLight} ${styles.pointer}`}
            >
              {t('contact')}
            </Link>
            <Link
              target={'_blank'}
              href="https://discord.gg/gqjHV3t5pF"
              className={styles.textLight}
            >
              {t('joinOurDiscord')}{' '}
            </Link>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            Copyright © 2024 Nerdbord OU All rights reserved.
          </span>
          <div className={styles.terms}>
            <Link
              target={'_blank'}
              href="https://glory-licorice-2e2.notion.site/Privacy-policy-6c075e8ad0de4927addf9592bb29de6e?pvs=4"
              className={styles.textDark}
            >
              {t('privacyPolicy')}
            </Link>
            <Link
              target={'_blank'}
              href="https://glory-licorice-2e2.notion.site/Good-Dev-Hunting-User-Terms-and-Conditions-77b1c52963f94edbb898a36e2a2ac512"
              className={styles.textDark}
            >
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default LandingFooter
