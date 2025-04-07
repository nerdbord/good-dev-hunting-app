'use client'

import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import styles from './AddJobSuccessModal.module.scss'

export const AddJobSuccessModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const t = useTranslations(I18nNamespaces.AddJobSuccessModal)
  const tt = useTranslations(I18nNamespaces.Applications)
  const router = useRouter()

  const handleGoToMyJobs = () => {
    closeModal()
    router.push(AppRoutes.myJobs)
  }

  return (
    <div className={styles.container} data-testid="addJobSuccessModal">
      <button
        className={styles.closeButton}
        onClick={handleGoToMyJobs}
        aria-label="Close modal"
      >
        ×
      </button>
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="25"
            viewBox="0 0 33 25"
            fill="none"
          >
            <path d="M1.5 12.5L11 22L31.5 1.5" stroke="white" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <h2 className={styles.header}>{t('title')}</h2>
      <p className={styles.description}>{t('description')}</p>

      <div className={styles.actions}>
        <Button variant="primary" onClick={handleGoToMyJobs}>
          {tt('backButton')}
        </Button>
      </div>
    </div>
  )
}
