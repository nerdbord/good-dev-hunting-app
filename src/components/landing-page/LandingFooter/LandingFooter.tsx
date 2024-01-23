import React from 'react'
import styles from './LandingFooter.module.scss'
import Logo from '@/components/Logo/Logo'
import { Container } from '@/components/Container/Container'

const LandingFooter = () => {
  return (
    <section id="LandingFooter" className={styles.footer}>
      <Container>
        <div className={styles.topBar}>
          <Logo />
          <div className={styles.contact}>
            <span className={styles.textDark}>Good Dev Hunting</span>
            <span className={styles.textLight}>Contact</span>
            <span className={styles.textLight}>Join our Discord</span>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            Copyright © 2024 Nerdbord OU All rights reserved.
          </span>
          <div className={styles.terms}>
            <span className={styles.textDark}>Privacy Policy</span>
            <span className={styles.textDark}>Terms of service</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default LandingFooter
