import { type ProfileModel } from '@/app/(profile)/types'
import { ToastContextProvider } from '@/contexts/ToastContext'
import ContactForm from '../ContactForm'
import styles from './ContactFormModal.module.scss'

export default function ContactFormModal({
  userProfile,
  closeModal,
  showSuccessMsg,
}: {
  userProfile: ProfileModel
  closeModal: () => void
  showSuccessMsg: () => void
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ToastContextProvider>
          <ContactForm
            userProfile={userProfile}
            closeModal={closeModal}
            showSuccessMsg={showSuccessMsg}
          />
        </ToastContextProvider>
      </div>
    </div>
  )
}
