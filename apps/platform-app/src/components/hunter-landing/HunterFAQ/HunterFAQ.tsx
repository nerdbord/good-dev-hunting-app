'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './HunterFAQ.module.scss'

type Props = {}

export const HunterFAQ = (props: Props) => {
  const t = useTranslations(I18nNamespaces.HunterFAQ)

  const handleContact = () => {
    const encodedEmailParts = ['bWFpbHRv', 'OnRlYW1AZGV2aHVudGluZy5jby==']
    window.location.href = atob(encodedEmailParts.join(''))
  }

  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.left}>
        <p className={styles.title}>{t('title')}</p>
        <p className={styles.desc}>{t('desc')}</p>
        <Button variant="allpurple" onClick={handleContact}>
          {t('button')}
        </Button>
      </div>
      <div className={styles.right}>
        <Accordion
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

// accordion
const cx = classNames.bind(styles)

type AccordionItem = {
  question: string
  answer: string
}

type AccordionProps = {
  items: AccordionItem[]
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className={styles.accordionWrapper}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const contentClasses = cx({
          [styles.accordionContent]: true,
          [styles.isOpen]: isOpen,
        })

        return (
          <section
            key={index}
            className={styles.accordion}
            onClick={() => toggleAccordion(index)}
          >
            <div className={styles.titleWrapper}>
              <p>{item.question}</p>
              <div className={styles.icon}>+</div>
            </div>
            <div className={contentClasses}>
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
