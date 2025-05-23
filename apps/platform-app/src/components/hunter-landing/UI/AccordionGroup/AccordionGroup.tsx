'use client'
import classNames from 'classnames/bind'
import { useId, useRef, useState } from 'react'
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
  const accordionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number
    let prevIndex: number

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        toggleAccordion(index)
        break
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = (index + 1) % items.length
        accordionRefs.current[nextIndex]?.focus()
        break
      case 'ArrowUp':
        event.preventDefault()
        prevIndex = (index - 1 + items.length) % items.length
        accordionRefs.current[prevIndex]?.focus()
        break
      case 'Home':
        event.preventDefault()
        accordionRefs.current[0]?.focus()
        break
      case 'End':
        event.preventDefault()
        accordionRefs.current[items.length - 1]?.focus()
        break
      default:
        break
    }
  }

  return (
    <div
      className={styles.accordionWrapper}
      role="region"
      aria-label="Najczęściej zadawane pytania"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const contentId = `${baseId}-content-${index}`
        const headerId = `${baseId}-header-${index}`
        const contentClasses = cx({
          [styles.accordionContent]: true,
          [styles.isOpen]: isOpen,
        })

        return (
          <section key={index} className={styles.accordion}>
            <h3 className={styles.heading}>
              <button
                className={styles.question}
                onClick={() => toggleAccordion(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                id={headerId}
                ref={(el) => {
                  accordionRefs.current[index] = el
                }}
              >
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  {isOpen ? '–' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={contentId}
              className={contentClasses}
              role="region"
              aria-labelledby={headerId}
              aria-live="polite"
            >
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
