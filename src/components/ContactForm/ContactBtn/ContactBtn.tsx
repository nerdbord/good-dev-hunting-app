'use client'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import { ProfileModel } from '@/data/frontend/profile/types'
import ContactFormModal from '../ContactFormModal/ContactFormModal'
import ContactResultModal from '../ContactResultModal/ContactResultModal'

const ContactBtn = ({ userProfile }: { userProfile: ProfileModel }) => {
  const { showModal, closeModal } = useModal()

  return (
    <div data-test-id="contactBtn">
      <Button
        onClick={() => {
          showModal(
            <ContactFormModal
              userProfile={userProfile}
              showResultMsg={(success: boolean) => {
                showModal(
                  <ContactResultModal
                    userProfile={userProfile}
                    onClose={closeModal}
                    success={success}
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
