'use client'
import styles from './AddJobTopBar.module.scss'

interface AddJobTopBarProps {
  header: string
  subHeader?: string
}

export const AddJobTopBar = ({ header, subHeader }: AddJobTopBarProps) => {
  return (
    <div className={styles.titleBox}>
      <h3 className={styles.title}>{header}</h3>
      {subHeader && <p className={styles.subHeader}>{subHeader}</p>}
    </div>
  )
}
