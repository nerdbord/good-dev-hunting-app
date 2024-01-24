import { ProfileModel } from '@/data/frontend/profile/types'
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
        <ContactForm
          userProfile={userProfile}
          closeModal={closeModal}
          showSuccessMsg={showSuccessMsg}
        />
      </div>
    </div>
  )
}
