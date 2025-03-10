import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import { HeroBottom } from './HeroBottom/HeroBottom'
import styles from './HunterHero.module.scss'
type Props = {}

export const HunterHero = async (props: Props) => {
  const t = await getTranslations(I18nNamespaces.HunterHero)

  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.topSection}>
        <div className={styles.titleSection}>
          <p className={styles.specialistsCount}>{t('specialistsCount')}</p>
          <h1 className={styles.title}>
            <span className={styles.titleDesktop}>{t('title')}</span>
            <span className={styles.titleDesktop}>{t('titleBottom')}</span>
            <span className={styles.titleMobile}>{t('titleMobile')}</span>
          </h1>
        </div>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <HeroBottom />
    </section>
  )
}
