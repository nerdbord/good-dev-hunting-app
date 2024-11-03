'use client'

import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { I18nNamespaces } from '@/i18n'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import modalStyles from './modalStyles.module.scss'

export const ConfirmLogoutModal = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations(I18nNamespaces.ConfirmLogoutModal)

  return (
    <div className={modalStyles.container}>
      <h4>{t('title')}</h4>
      <p className={modalStyles.description}>{t('description')}</p>
      <div className={modalStyles.actionButtons}>
        <LogOutBtn />
        <Button variant={'primary'} onClick={() => onClose()}>
          {t('cancelBtn')}
        </Button>
      </div>
    </div>
  )
}
