import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import styles from './HunterCTA.module.scss'

export const HunterCTA = () => {
  const t = useTranslations(I18nNamespaces.HunterCTA)

  const scrollToHero = useCallback(() => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div id="CTA" className={styles.wrapper}>
      <div className={styles.boxLeft} />

      <div className={styles.content}>
        <div className={styles.ctaContent}>
          <h2 className={styles.title}>{t('title')}</h2>
          <button
            type="button"
            className={styles.button}
            onClick={scrollToHero}
          >
            {t('button')}
          </button>
        </div>
      </div>

      <div className={styles.boxRight} />
    </div>
  )
}
