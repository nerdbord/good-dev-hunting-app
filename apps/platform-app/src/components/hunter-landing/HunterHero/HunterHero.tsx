import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { HeroBottom } from './HeroBottom/HeroBottom'
import styles from './HunterHero.module.scss'
type Props = {}

export const HunterHero = async (props: Props) => {
  const t = await getTranslations(I18nNamespaces.HunterHero)

  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.backgroundIcons}>
        <div className={`${styles.icon} ${styles.reactIcon}`}>
          <div className={styles.gradientOuter}>
            <div className={styles.gradientInner}>
              <div className={styles.backgroundShadow}>
                <Image
                  src="/LandingHunter/react-svg.svg"
                  alt="React"
                  width={48}
                  height={65}
                  className={styles.techImage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.icon} ${styles.pythonIcon}`}>
          <div className={styles.gradientOuter}>
            <div className={styles.gradientInner}>
              <div className={styles.backgroundShadow}>
                <Image
                  src="/LandingHunter/python-svg.svg"
                  alt="Python"
                  width={48}
                  height={65}
                  className={styles.techImage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.icon} ${styles.javaIcon}`}>
          <div className={styles.gradientOuter}>
            <div className={styles.gradientInner}>
              <div className={styles.backgroundShadow}>
                <Image
                  src="/LandingHunter/java-svg.svg"
                  alt="Java"
                  width={48}
                  height={65}
                  className={styles.techImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.topSection}>
        <div className={styles.titleSection}>
          <p className={styles.specialistsCount}>{t('specialistsCount')}</p>
          <h1 className={styles.title}>
            <span className={styles.titleDesktop}>{t('title')}</span>
            <span className={styles.titleMobile}>{t('titleMobile')}</span>
          </h1>
        </div>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <HeroBottom />
    </section>
  )
}
