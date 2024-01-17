import React, { FC, ReactNode } from 'react'
import styles from './TraitTemplate.module.scss'

interface TraitTemplateProps {
  icon: ReactNode
  title: string
  description: string
}

const TraitTemplate: FC<TraitTemplateProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.descr}>{description}</div>
    </div>
  )
}

export default TraitTemplate
