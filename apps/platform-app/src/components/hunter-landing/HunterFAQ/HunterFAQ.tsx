'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { AccordionGroup } from '../UI/AccordionGroup/AccordionGroup'
import styles from './HunterFAQ.module.scss'

export const HunterFAQ = () => {
  const t = useTranslations(I18nNamespaces.HunterFAQ)

  const handleContact = () => {
    const encodedEmailParts = ['bWFpbHRv', 'OnRlYW1AZGV2aHVudGluZy5jby==']
    window.location.href = atob(encodedEmailParts.join(''))
  }

  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.desc}>{t('desc')}</p>
        <Button variant="allpurple" onClick={handleContact}>
          {t('button')}
        </Button>
      </div>
      <div className={styles.right}>
        <AccordionGroup
          items={[
            {
              question: t('accordeon.questionOne'),
              answer: t('accordeon.answerOne'),
            },
            {
              question: t('accordeon.questionTwo'),
              answer: t('accordeon.answerTwo'),
            },
            {
              question: t('accordeon.questionThree'),
              answer: t('accordeon.answerThree'),
            },
          ]}
        />
      </div>
    </section>
  )
}
