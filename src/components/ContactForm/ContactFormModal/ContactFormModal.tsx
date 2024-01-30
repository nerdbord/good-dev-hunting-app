import { ProfileModel } from '@/data/frontend/profile/types'
import ContactForm from '../ContactForm'
import styles from './ContactFormModal.module.scss'

export default function ContactFormModal({
  userProfile,
  closeModal,
  showResultMsg,
}: {
  userProfile: ProfileModel
  closeModal: () => void
  showResultMsg: (success: boolean) => void
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ContactForm
          userProfile={userProfile}
          closeModal={closeModal}
          showResultMsg={showResultMsg}
        />
      </div>
    </div>
  )
}
