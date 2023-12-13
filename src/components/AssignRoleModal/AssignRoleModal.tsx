import { Button } from '@/components/Button/Button'

import styles from './AssignRole.module.scss'
import modalStyles from '@/components/Modal/Modal.module.scss'

export default function AssignRoleModal({
  onClose,
}: {
  profileId: string
  onClose: () => void
}) {
  return (
    <div className={modalStyles.container}>
      <h4>Assign admin role</h4>
      <p className={styles.info}>
        User will have full moderation permissions and option to assign other
        profiles as admins. <br />
        Are you sure you want to assign this role?
      </p>
      <div className={modalStyles.actionButtons}>
        <Button variant="primary">Yes, assign</Button>
        <Button variant={'action'} onClick={() => onClose()}>
          No, don't assign
        </Button>
      </div>
    </div>
  )
}
