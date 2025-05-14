import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import styles from './HunterCTA.module.scss'

export const HunterCTA = () => {
  const t = useTranslations(I18nNamespaces.HunterCTA)

  return (
    <div id="CTA" className={styles.wrapper}>
      <div className={styles.boxLeft} />

      <div className={styles.content}>
        <div className={styles.ctaContent}>
          <h2 className={styles.title}>{t('title')}</h2>
          <Link href={AppRoutes.postJob} className={styles.button}>
            {t('button')}
          </Link>
        </div>
      </div>

      <div className={styles.boxRight} />
    </div>
  )
}
