'use client'

import { I18nNamespaces } from '@/i18n'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ContactFormModal from '../ContactFormModal/ContactFormModal'

const ContactBtn = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const [isModalOpen, showModal] = useState(false)

  const handleOpenModal = () => {
    showModal(true)
  }

  const handleCloseModal = () => {
    showModal(false)
  }

  return (
    <div data-test-id="contactBtn">
      <Button onClick={handleOpenModal} variant={'primary'}>
        {t('sendMessage')}{' '}
      </Button>
      {isModalOpen && <ContactFormModal onClose={handleCloseModal} />}
    </div>
  )
}

export default ContactBtn
