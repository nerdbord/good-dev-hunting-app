'use client'
import { useProfileModel } from '@/app/[locale]/(profile)/_providers/Profile.provider'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import ContactFormModal from '../ContactFormModal/ContactFormModal'
import ContactSuccessModal from '../ContactSuccessModal.tsx/ContactSuccessModal'

const ContactBtn = () => {
  const { showModal, closeModal } = useModal()
  const { profile } = useProfileModel()

  if (!profile) {
    return null
  }

  return (
    <div data-test-id="contactBtn">
      <Button
        onClick={() => {
          showModal(
            <ContactFormModal
              userProfile={profile}
              showSuccessMsg={() => {
                showModal(
                  <ContactSuccessModal
                    userProfile={profile}
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
