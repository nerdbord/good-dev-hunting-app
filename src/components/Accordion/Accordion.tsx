'use client'
import { ReactNode, useState } from 'react'
import styles from './Accordion.module.scss'
import AccordionIcon from './icons/AccordionIcon'

export enum AccordionIconType {
  Add = 'add',
  Subtract = 'subtract',
}

interface AccordionProps {
  title: string
  children: ReactNode
}

const Accordion = (props: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false)

  const handleOpen = () => {
    setAccordionOpen((prevOpen) => !prevOpen)
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper} onClick={handleOpen}>
        <p>{props.title}</p>
        <div className={styles.iconWrapper}>
          <AccordionIcon
            type={
              accordionOpen ? AccordionIconType.Subtract : AccordionIconType.Add
            }
          />
        </div>
      </div>
      {accordionOpen && (
        <div className={styles.accordionContent}>{props.children}</div>
      )}
    </section>
  )
}

export default Accordion
