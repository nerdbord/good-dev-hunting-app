import PostJobBtn from '@/app/[locale]/(jobs)/(components)/PostJobBtn/PostJobBtn'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './CTASection.module.scss'

const CTASection = async () => {
  const t = await getTranslations(I18nNamespaces.Hunter)

  return (
    <section id="cta" className={styles.wrapper}>
      <h2>{t('ctaTitle')}</h2>
      <p>{t('ctaDesc')}</p>
      <PostJobBtn />
    </section>
  )
}

export default CTASection
