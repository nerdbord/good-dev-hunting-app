'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import styles from './LeaveSiteWarningModal.module.scss'

interface LeaveSiteWarningModalProps {
  onClose: () => void
  onConfirm: () => void
  destinationUrl?: string | null
}

export const LeaveSiteWarningModal: React.FC<LeaveSiteWarningModalProps> = ({
  onClose,
  onConfirm,
  destinationUrl,
}) => {
  const t = useTranslations(I18nNamespaces.LeaveSiteWarningModal)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (cancelButtonRef.current) {
      const timerId = setTimeout(() => {
        cancelButtonRef.current?.focus()
      }, 100)
      return () => clearTimeout(timerId)
    }
  }, [])

  const urlToDisplay = destinationUrl || t('unknownDestination')
  const messageKey = destinationUrl
    ? 'destinationUrlStrong'
    : 'unknownDestination'

  return (
    <div className={styles.container} data-testid="leaveSiteWarningModal">
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label={t('closeModalAriaLabel')}
      >
        ×
      </button>

      <div className={styles.iconContainer}>
        <AlertTriangle size={42} strokeWidth={2.5} />
      </div>

      <h2 className={styles.header}>{t('title')}</h2>
      <div className={styles.description}>
        <p>{t('messagePart1')}</p>
        <p className={styles.destinationUrl}>
          {t.rich(messageKey, {
            url: urlToDisplay,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('confirmationQuestion')}</p>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={onClose} ref={cancelButtonRef}>
          {t('cancelButton')}
        </Button>
        <Button variant="secondary" onClick={onConfirm}>
          {t('proceedButton')}
        </Button>
      </div>
    </div>
  )
}
