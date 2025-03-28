'use client'

import { I18nNamespaces } from '@/i18n/request'
// import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
// import { useRouter } from 'next/navigation'
import styles from './AddJobErrorModal.module.scss'

export const AddJobErrorModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const t = useTranslations(I18nNamespaces.AddJobErrorModal)
  // const router = useRouter()

  const handleShowErrors = () => {
    closeModal()
    // router.push(AppRoutes.postJob)
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

      <h2 className={styles.header}>{t('title')}</h2>
      <p className={styles.description}>{t('description')}</p>

      <div className={styles.actions}>
        <Button variant="primary" onClick={handleShowErrors}>
          {t('errorBtn')}
        </Button>
      </div>
    </div>
  )
}
