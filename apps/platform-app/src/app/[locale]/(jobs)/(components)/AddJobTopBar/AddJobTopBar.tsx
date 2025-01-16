'use client'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './AddJobTopBar.module.scss'

export function AddJobTopBar() {
  const t = useTranslations(I18nNamespaces.AddJobTopBar)

  // const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>{t('header')}</span>
    </div>
  )
}
