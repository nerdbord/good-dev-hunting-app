'use client'
import type { ReactNode } from 'react'
import styles from './JobsTopBar.module.scss'

interface JobsTopBarProps {
  header: string
  subHeader?: string
  children?: ReactNode
}

export const JobsTopBar = ({
  header,
  subHeader,
  children,
}: JobsTopBarProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>{header}</h3>
        {subHeader && <p className={styles.subHeader}>{subHeader}</p>}
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  )
}
