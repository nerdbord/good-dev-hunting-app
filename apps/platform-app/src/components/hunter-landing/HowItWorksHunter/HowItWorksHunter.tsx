import { MatchIcon, PostIcon, VideoCallIcon } from '@/components/icons'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './HowItWorksHunter.module.scss'

const HowItWorksHunter = async () => {
  const t = await getTranslations(I18nNamespaces.Hunter)

  const steps = [
    {
      icon: <PostIcon />,
      title: t('post'),
      description: t('postDesc'),
    },
    {
      icon: <MatchIcon />,
      title: t('match'),
      description: t('matchDesc'),
    },
    {
      icon: <VideoCallIcon />,
      title: t('connect'),
      description: t('connectDesc'),
    },
  ]

  return (
    <section id="how-it-works" className={styles.wrapper}>
      <h2>{t('howItWorks')}</h2>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksHunter
