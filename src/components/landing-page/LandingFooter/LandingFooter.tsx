'use client'
import { Container } from '@/components/Container/Container'
import Logo from '@/components/Logo/Logo'
import Link from 'next/link'
import styles from './LandingFooter.module.scss'

const LandingFooter = () => {
  const handleContact = () => {
    const link = document.createElement('a')
    link.href = 'mailto:team@devhunting.co'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <section id="LandingFooter" className={styles.footer}>
      <Container>
        <div className={styles.topBar}>
          <Logo />
          <div className={styles.contact}>
            <span className={styles.textDark}>Good Dev Hunting</span>
            <span
              className={`${styles.textLight} ${styles.pointer}`}
              onClick={handleContact}
            >
              Contact
            </span>
            <Link
              target={'_blank'}
              href="https://discord.gg/gqjHV3t5pF"
              className={styles.textLight}
            >
              Join our Discord
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
              Privacy Policy
            </Link>
            <Link
              target={'_blank'}
              href="https://glory-licorice-2e2.notion.site/Good-Dev-Hunting-User-Terms-and-Conditions-77b1c52963f94edbb898a36e2a2ac512"
              className={styles.textDark}
            >
              Terms of service
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default LandingFooter
