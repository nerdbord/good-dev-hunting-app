'use client'
import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './AccordionGroup.module.scss'

const cx = classNames.bind(styles)

type Accordion = {
  question: string
  answer: string
}

type AccordionGroupProps = {
  items: Accordion[]
}

export const AccordionGroup = ({ items }: AccordionGroupProps) => {
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
