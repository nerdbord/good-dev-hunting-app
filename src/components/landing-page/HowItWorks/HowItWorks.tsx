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
            title="Reversed recruitment"
            description="Employers will find you based on your skills and availability. You don't need to apply for jobs."
          />
          <TraitTemplate
            icon={<GithubIcon />}
            title="Open source"
            description="Our platform is open source and we are proud of it. We believe in transparency and community."
          />
          <TraitTemplate
            icon={<ConnectIcon />}
            title="Remote first"
            description="Our mission is to connect talents with employers from all over the world despite the distance."
          />
          <TraitTemplate
            icon={<DollarIcon />}
            title="Completely free"
            description="Creating profile and connecting with employers is free. We want to democratize and simplify the recruitment process."
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
