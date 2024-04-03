'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import ContactFormModal from '../ContactFormModal/ContactFormModal'
import ContactSuccessModal from '../ContactSuccessModal.tsx/ContactSuccessModal'

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
        Send message
      </Button>
    </div>
  )
}

export default ContactBtn
