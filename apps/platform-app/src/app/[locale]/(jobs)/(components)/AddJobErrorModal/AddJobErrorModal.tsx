'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import styles from './AddJobErrorModal.module.scss'

interface AddJobErrorModalProps {
  closeModal: () => void
  isVerificationFailure?: boolean
  rejectionReason?: string[] | null
}

export const AddJobErrorModal = ({
  closeModal,
  isVerificationFailure = false,
  rejectionReason,
}: AddJobErrorModalProps) => {
  const t = useTranslations(I18nNamespaces.AddJobErrorModal)
  const actionButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (actionButtonRef.current) {
      const timerId = setTimeout(() => {
        actionButtonRef.current?.focus()
      }, 100)
      return () => clearTimeout(timerId)
    }
  }, [])

  const handleAction = () => {
    closeModal()
  }

  let modalTitle = isVerificationFailure
    ? t('verificationFailedTitle')
    : t('title')
  const modalDescription = isVerificationFailure
    ? t('verificationFailedDescription')
    : t('description')
  const buttonText = isVerificationFailure ? t('editJobBtn') : t('errorBtn')

  if (rejectionReason) {
    modalTitle = t('rejectionTitle')
  }

  return (
    <div className={styles.container} data-testid="addJobErrorModal">
      <button
        className={styles.closeButton}
        onClick={closeModal}
        aria-label={t('closeModalAriaLabel')}
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

      <h2 className={styles.header}>{modalTitle}</h2>

      {rejectionReason ? (
        <div className={styles.rejectionReasonContainer}>
          <p className={styles.rejectionReasonLabel}>
            {t('rejectionReasonLabel')}
          </p>
          <p className={styles.rejectionReasonText}>
            {rejectionReason.join(`\n`)}
          </p>
        </div>
      ) : (
        <p className={styles.description}>{modalDescription}</p>
      )}

      <div className={styles.actions}>
        <Button variant="primary" onClick={handleAction} ref={actionButtonRef}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
