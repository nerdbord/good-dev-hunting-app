import { Button } from '@gdh/ui-system'
import styles from './ContactResultModal.module.scss'

export default function ContactSuccessModal({
  name,
  onClose,
}: {
  name: string
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
        {getName(name)}.
      </p>
      <div data-test-id="closeBtn">
        <Button variant={'primary'} onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
