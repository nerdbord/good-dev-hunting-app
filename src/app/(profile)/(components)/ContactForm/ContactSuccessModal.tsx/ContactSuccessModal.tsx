'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { Button } from '../../../../../components/Button/Button'
import styles from './ContactResultModal.module.scss'

export default function ContactSuccessModal({
  userProfile,
  onClose,
}: {
  userProfile: ProfileModel
  onClose: () => void
}) {
  const getName = (name: string) => {
    return name.trim().split(' ')[0]
  }
  return (
    <div className={styles.container} data-test-id="confirmMessageSent">
      <h4>Message sent!</h4>
      <p>
        Your message was sent, you can now relax and wait for the response from{' '}
        {getName(userProfile.fullName)}.
      </p>
      <div data-test-id="closeBtn">
        <Button variant={'primary'} onClick={() => onClose()}>
          Close
        </Button>
      </div>
    </div>
  )
}
