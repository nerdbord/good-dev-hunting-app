'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import styles from './AddJobVerificationModal.module.scss'

interface AddJobVerificationModalProps {
  closeModal: () => void
}

export const AddJobVerificationModal = ({
  closeModal,
}: AddJobVerificationModalProps) => {
  const t = useTranslations(I18nNamespaces.AddJobVerificationModal)

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
      <span className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </span>
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
