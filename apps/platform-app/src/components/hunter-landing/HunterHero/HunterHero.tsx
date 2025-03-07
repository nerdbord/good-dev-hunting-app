import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
// import Image from 'next/image'
import styles from './HunterHero.module.scss'
import { HeroBottom } from './HeroBottom/HeroBottom'
type Props = {}

export const HunterHero = async (props: Props) => {
  const t = await getTranslations(I18nNamespaces.HunterHero)

  return (
    <Container>
      <section id="hero" className={styles.wrapper}>
        {/* <div className={styles.backgroundIcons}>
        <div className={`${styles.icon} ${styles.reactIcon}`}>
          <Image
            src="/react-landing-icon.png"
            alt="React"
            width={80}
            height={80}
          />
        </div>
        <div className={`${styles.icon} ${styles.pythonIcon}`}>
          <Image
            src="/python-landing-icon.png"
            alt="Python"
            width={80}
            height={80}
          />
        </div>
        <div className={`${styles.icon} ${styles.javaIcon}`}>
          <Image
            src="/java-sm-landing-icon.png"
            alt="Java"
            width={80}
            height={80}
          />
        </div>
      </div> */}

        <div className={styles.topSection}>
          <div className={styles.titleSection}>
            <p className={styles.specialistsCount}>{t('specialistsCount')}</p>
            <h1 className={styles.title}>{t('title')}</h1>
          </div>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <HeroBottom />
      </section>
    </Container>
  )
}
