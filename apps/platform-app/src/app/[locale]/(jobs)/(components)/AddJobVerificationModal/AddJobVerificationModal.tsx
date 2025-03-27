'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import styles from './AddJobVerificationModal.module.scss'

interface AddJobVerificationModalProps {
  closeModal: () => void
}

export const AddJobVerificationModal = ({
  closeModal,
}: AddJobVerificationModalProps) => {
  const t = useTranslations(I18nNamespaces.AddJobVerificationModal)
  const [dots, setDots] = useState('.')

  // Animation for the dots
  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.container} data-testid="addJobVerificationModal">
      <button 
        className={styles.closeButton} 
        onClick={closeModal}
        aria-label="Close modal"
      >
        ×
      </button>
      <div className={styles.loadingContainer}>
        <span className={styles.dots}>{dots}</span>
      </div>

      <h2 className={styles.header}>{t('title')}</h2>
      <p className={styles.description}>{t('description')}</p>

      <div className={styles.actions}>
        <Button variant="primary" disabled>
          {t('inProgressBtn')}
        </Button>
      </div>
    </div>
  )
}
