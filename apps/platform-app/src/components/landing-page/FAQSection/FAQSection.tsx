import { I18nNamespaces } from '@/i18n'
import { useTranslations } from 'next-intl'
import { Accordion } from '@gdh/ui-system/src/components/Accordion/Accordion'
import styles from './FAQSection.module.scss'

const FAQSection = () => {
  const t = useTranslations(I18nNamespaces.Faq)
  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.heading}>
        <span>FAQ</span>
        <small>{t('description')}</small>
      </div>
      <div className={styles.faq}>
        <Accordion title={t('questionOne')}>
          <p>{t('answerOne')}</p>
        </Accordion>
        <Accordion title={t('questionTwo')}>
          <p>{t('answerTwo')}</p>
        </Accordion>
        <Accordion title={t('questionThree')}>
          <p>{t('answerThree')}</p>
        </Accordion>
        <Accordion title={t('questionFour')}>{t('answerFour')}</Accordion>
      </div>
    </section>
  )
}

export default FAQSection
