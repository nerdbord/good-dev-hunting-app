'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import { AnimatedReveal } from '../UI/AnimatedReveal/AnimatedReveal'
import styles from './HunterCTA.module.scss'

export const HunterCTA = () => {
  const t = useTranslations(I18nNamespaces.HunterCTA)

  const scrollToHero = useCallback(() => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      const headerOffset = 120 // wysokość headera w px
      const elementPosition =
        heroSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }, [])

  return (
    <AnimatedReveal direction="up" amount={0.2}>
      <div id="CTA" className={styles.wrapper}>
        <div className={styles.boxLeft} />

        <div className={styles.content}>
          <div className={styles.ctaContent}>
            <h2 className={styles.title}>{t('title')}</h2>
            <Button variant="primary" onClick={scrollToHero}>
              {t('button')}
            </Button>
          </div>
        </div>

        <div className={styles.boxRight} />
      </div>
    </AnimatedReveal>
  )
}
