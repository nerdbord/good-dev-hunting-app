'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'

import styles from '.././(routes)/applications/[id]/page.module.scss'

const ActionButtons = () => {
  const t = useTranslations(I18nNamespaces.Applications)

  const handleAccept = () => {
    // Handle accept action
  }

  const handleReject = () => {
    // Handle reject action
  }

  return (
    <div className={styles.actionButtons}>
      <Button onClick={handleAccept} variant="action">
        {t('accept')}
      </Button>
      <Button onClick={handleReject} variant="action">
        {t('reject')}
      </Button>
    </div>
  )
}

export default ActionButtons
