import PostJobBtn from '@/app/[locale]/(jobs)/(components)/PostJobBtn/PostJobBtn'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './HunterHero.module.scss'
import { HunterHeroProfilesSection } from './HunterHeroProfilesSection'

const HunterHero = async () => {
  const t = await getTranslations(I18nNamespaces.Hunter)

  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>{t('hero')}</span>
        </div>
        <div className={styles.subtitle}>
          <p>{t('trustworthy')}</p>
        </div>
        <div className={styles.buttons}>
          <PostJobBtn />
        </div>
      </div>
      <HunterHeroProfilesSection />
    </section>
  )
}

export default HunterHero
