import { useTranslations } from 'next-intl'
import Accordion from '../../Accordion/Accordion'
import styles from './FAQSection.module.scss'

const FAQSection = () => {
  const t = useTranslations('Faq')

  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.heading}>
        <span>{t('title')}</span>
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
        <Accordion title={t('questionFour')}>
          <p>{t('answerFour')}</p>
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection
