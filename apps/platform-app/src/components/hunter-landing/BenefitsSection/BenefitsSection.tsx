import { ShieldIcon, SpeedIcon, VerifiedIcon } from '@/components/icons'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './BenefitsSection.module.scss'

const BenefitsSection = async () => {
  const t = await getTranslations(I18nNamespaces.Hunter)

  const benefits = [
    {
      icon: <VerifiedIcon />,
      title: t('verifiedTitle'),
      description: t('verifiedDesc'),
    },
    {
      icon: <SpeedIcon />,
      title: t('speedTitle'),
      description: t('speedDesc'),
    },
    {
      icon: <ShieldIcon />,
      title: t('secureTitle'),
      description: t('secureDesc'),
    },
  ]

  return (
    <section id="benefits" className={styles.wrapper}>
      <h2>{t('benefits')}</h2>
      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.benefit}>
            {benefit.icon}
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BenefitsSection
