'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import styles from './AddJobErrorModal.module.scss'

interface AddJobErrorModalProps {
  closeModal: () => void;
  isVerificationFailure?: boolean;
}

export const AddJobErrorModal = ({
  closeModal,
  isVerificationFailure = false,
}: AddJobErrorModalProps) => {
  const t = useTranslations(I18nNamespaces.AddJobErrorModal)

  const handleShowErrors = () => {
    closeModal()
  }

  return (
    <div className={styles.container} data-testid="addJobErrorModal">
      <button
        className={styles.closeButton}
        onClick={closeModal}
        aria-label="Close modal"
      >
        ×
      </button>
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path d="M1.5 2L23 23.5" stroke="white" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <h2 className={styles.header}>
        {isVerificationFailure ? t('verificationFailedTitle') : t('title')}
      </h2>
      <p className={styles.description}>
        {isVerificationFailure 
          ? t('verificationFailedDescription')
          : t('description')}
      </p>

      <div className={styles.actions}>
        <Button variant="primary" onClick={handleShowErrors}>
          {isVerificationFailure ? t('editJobBtn') : t('errorBtn')}
        </Button>
      </div>
    </div>
  )
}
