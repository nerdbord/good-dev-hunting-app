'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import modalStyles from './modalStyles.module.scss'

export const ConfirmLeaveModal = ({
  onConfirm,
  onClose,
}: {
  onConfirm: () => void
  onClose: () => void
}) => {
  const t = useTranslations(I18nNamespaces.ConfirmLeaveModal)

  return (
    <div className={modalStyles.container}>
      <h4>{t('title')}</h4>
      <p className={modalStyles.description}>{t('description')}</p>
      <div className={modalStyles.actionButtons}>
        <Button variant={'secondary'} onClick={() => onConfirm()}>
          {t('leaveBtn')}
        </Button>
        <Button variant={'primary'} onClick={() => onClose()}>
          {t('cancelBtn')}
        </Button>
      </div>
    </div>
  )
}
