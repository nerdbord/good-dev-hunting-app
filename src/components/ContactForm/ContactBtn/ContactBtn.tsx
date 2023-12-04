'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import ContactFormModal from '../ContactFormModal/ContactFormModal'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useModal } from '@/contexts/ModalContext'
import ContactSuccessModal from '../ContactSuccessModal/ContactSuccessModal'

const ContactBtn = ({ userProfile }: { userProfile: ProfileModel }) => {
  const { showModal, closeModal } = useModal()

  return (
    <div data-test-id="contactBtn">
      <Button
        onClick={() => {
          showModal(
            <ContactFormModal
              userProfile={userProfile}
              showSuccessMsg={() => {
                showModal(
                  <ContactSuccessModal
                    userProfile={userProfile}
                    onClose={closeModal}
                  />,
                )
              }}
              closeModal={closeModal}
            />,
          )
        }}
        variant={'primary'}
      >
        Contact
      </Button>
    </div>
  )
}

export default ContactBtn
