'use client'

import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import Modal from '@/components/Modal/Modal'
import { I18nNamespaces } from '@/i18n'
import { useTranslations } from 'next-intl'


export const ConnectToNerdbordButton = () => {
  const t = useTranslations(I18nNamespaces.ConfirmLeaveModal)

  return (
    <Modal>
      <div>
        <h4>{t('title')}</h4>
        <p>{t('description')}</p>
        <div>
          <LogOutBtn />
          <button>{t('cancelBtn')}</button>
        </div>
      </div>
    </Modal>
  )
}
