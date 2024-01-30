'use client'
import { ProfileModel } from '@/data/frontend/profile/types'
import { Button } from '../../Button/Button'
import ContactFailureModalMessage from './ContactFailureModalMessage/ContactFailureModalMessage'
import styles from './ContactResultModal.module.scss'
import ContactSuccessModalMessage from './ContactSuccessModalMessage/ContactSuccessModalMessage'

export default function ContactResultModal({
  userProfile,
  onClose,
  success,
}: {
  userProfile: ProfileModel
  onClose: () => void
  success: boolean
}) {
  const getName = (name: string) => {
    return name.trim().split(' ')[0]
  }
  return (
    <div className={styles.container} data-test-id="confirmMessageSent">
      {success ? (
        <ContactSuccessModalMessage name={getName(userProfile.fullName)} />
      ) : (
        <ContactFailureModalMessage />
      )}
      <div data-test-id="closeBtn">
        <Button variant={'primary'} onClick={() => onClose()}>
          Close
        </Button>
      </div>
    </div>
  )
}
