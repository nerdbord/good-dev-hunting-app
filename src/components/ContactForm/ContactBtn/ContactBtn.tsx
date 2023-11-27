'use client'
import React, { useState } from 'react'
import { Button } from '@/components/Button/Button'

import ContactFormModal from '../ContactFormModal/ContactFormModal'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useModal } from '@/contexts/ModalContext'
import ContactSuccessModal from '../ContactSuccessModal/ContactSuccessModal'

const ContactBtn = ({ userProfile }: { userProfile: ProfileModel }) => {
  const [showFormModal, setShowFormModal] = useState<boolean>(false)
  const { showModal, closeModal } = useModal()

  return (
    <div>
      <Button
        onClick={() => {
          setShowFormModal(true)
        }}
        variant={'primary'}
      >
        Contact
      </Button>

      {showFormModal && (
        <ContactFormModal
          userProfile={userProfile}
          showSuccessMsg={() => {
            setShowFormModal(false)
            showModal(
              <ContactSuccessModal
                userProfile={userProfile}
                onClose={closeModal}
              />,
            )
          }}
          closeModal={() => setShowFormModal(false)}
        />
      )}
    </div>
  )
}

export default ContactBtn
