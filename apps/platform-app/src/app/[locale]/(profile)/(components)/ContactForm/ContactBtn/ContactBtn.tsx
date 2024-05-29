'use client'

import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import { I18nNamespaces } from '@/i18n'
import { useTranslations } from 'next-intl'
import ContactFormModal from '../ContactFormModal/ContactFormModal'

const ContactBtn = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const { showModal } = useModal()

  return (
    <div data-test-id="contactBtn">
      <Button
        onClick={() => {
          showModal(<ContactFormModal />)
        }}
        variant={'primary'}
      >
        {t('sendMessage')}{' '}
      </Button>
    </div>
  )
}

export default ContactBtn
