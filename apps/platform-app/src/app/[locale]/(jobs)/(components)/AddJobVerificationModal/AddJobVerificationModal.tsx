'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import styles from './AddJobVerificationModal.module.scss'

interface AddJobVerificationModalProps {
  closeModal: () => void
  status: 'idle' | 'verifying' | 'completed' | 'failed'
}

export const AddJobVerificationModal = ({ 
  closeModal, 
  status 
}: AddJobVerificationModalProps) => {
  const t = useTranslations(I18nNamespaces.AddJobVerificationModal)
  return (
    <div className={styles.container} data-testid="addJobVerificationModal">
      <div className={styles.loadingContainer}>
        <div className={styles.loadingDots}></div>
      </div>
      
      <h2 className={styles.header}>{t('title')}</h2>
      <p className={styles.description}>{t('description')}</p>
      
      <div className={styles.actions}>
        <Button variant="primary" onClick={() => {}}>
          {t('inProgressBtn')}
        </Button>
      </div>
    </div>
  )
}
 