'use client'
import styles from './AddJobTopBar.module.scss'

interface AddJobTopBarProps {
  header: string
  description?: string
}

export const AddJobTopBar = ({ header, description }: AddJobTopBarProps) => {
  return (
    <div className={styles.titleBox}>
      <h3 className={styles.title}>{header}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
