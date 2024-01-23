'use client'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import ContactFormModal from '../ContactFormModal/ContactFormModal'
import ContactSuccessModal from '../ContactSuccessModal/ContactSuccessModal'

const ContactBtn = ({
  userProfile,
}: {
  userProfile: ProfileModelSimplified
}) => {
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
