import React from 'react'
import styles from './LandingFooter.module.scss'
import { Container } from '@/components/Container/Container'
import Logo from '@/components/Logo/Logo'

const LandingFooter = () => {
  return (
    <Container>
      <div className={styles.footer}>
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
      </div>
    </Container>
  )
}

export default LandingFooter
