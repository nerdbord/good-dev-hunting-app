import ConnectIcon from '@/assets/icons/ConnectIcon'
import DollarIcon from '@/assets/icons/DollarIcon'
import GithubIcon from '@/assets/icons/GithubIcon'
import GlobeIcon from '@/assets/icons/GlobeIcon'
import { useTranslations } from 'next-intl'
import styles from './HowItWorks.module.scss'
import Step from './Step/Step'
import TraitTemplate from './TraitTemplate/TraitTemplate'

const HowItWorks = () => {
  const t = useTranslations('HowItWorks')

  return (
    <section id="HowItWorks" className={styles.wrapper}>
      <div className={styles.titleBox}>
        <span className={styles.sectionName}>{t('howitworks')}</span>
        <span className={styles.title}>{t('faqsection')}</span>
      </div>
      <div className={styles.steps}>
        <Step
          title={t('titleOne')}
          description1={t('stepOneDescriptionOne')}
          description2={t('stepOneDescriptionTwo')}
        />
        <Step
          title={t('titleTwo')}
          description1={t('stepTwoDescriptionOne')}
          description2={t('stepTwoDescriptionTwo')}
        />
      </div>

      <div className={styles.traitsBox}>
        <div className={styles.traits}>
          <TraitTemplate
            icon={<GlobeIcon />}
            title={t('titleThree')}
            description={t('descriptionOne')}
          />
          <TraitTemplate
            icon={<GithubIcon />}
            title={t('titleFour')}
            description={t('descriptionTwo')}
          />
          <TraitTemplate
            icon={<ConnectIcon />}
            title={t('titleFive')}
            description={t('descriptionThree')}
          />
          <TraitTemplate
            icon={<DollarIcon />}
            title={t('titleSix')}
            description={t('descriptionFour')}
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
