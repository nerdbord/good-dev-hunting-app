'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './HunterFAQ.module.scss'

type Props = {}

export const HunterFAQ = (props: Props) => {
  const t = useTranslations(I18nNamespaces.Faq)

  const handleContact = () => {
    console.log('clicked')
  }

  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.left}>
        <p className={styles.title}>Najczęstsze pytania</p>
        <p className={styles.desc}>
          Znajdź odpowiedzi na najczęściej zadawane pytania lub skontaktuj się z
          nami. Chętnie pomożemy i rozwiejemy wszelkie wątpliwości.
        </p>
        <Button variant="allpurple" onClick={handleContact}>
          Napisz do nas
        </Button>
      </div>
      <div className={styles.right}>
        <Accordion
          items={[
            {
              question: 'Czy to rzeczywiście za darmo?',
              answer: 'Tak, dodanie zlecenia jest w pełni za darmo.',
            },
            {
              question: 'Jak dostanę informacje od specjalistów?',
              answer:
                'Informacje od specjalistów otrzymasz na podany adres e-mail.',
            },
            {
              question: 'Ile zleceń mogę zapostować?',
              answer: 'Możesz zapostować dowolną liczbę zleceń.',
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
