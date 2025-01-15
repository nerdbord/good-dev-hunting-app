'use client'
import styles from './AddJobTopBar.module.scss'

export function AddJobTopBar() {
  // const t = useTranslations(I18nNamespaces.Buttons)

  // const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>{'Post New Job'}</span>
    </div>
  )
}
