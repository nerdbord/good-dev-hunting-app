import { Button } from '@/components/Button/Button'

import modalStyles from '@/components/Modal/Modal.module.scss'
import { Role } from '@prisma/client'
import styles from './AssignRole.module.scss'

export default function AssignRoleModal({
  profileId,
  userRoles,
  onClose,
}: {
  profileId: string
  userRoles: Role[]
  onClose: () => void
}) {
  return !userRoles.includes(Role.MODERATOR) ? (
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
  ) : (
    <div className={modalStyles.container}>
      <h4>Unassign admin role</h4>
      <p className={styles.info}>
        User will no more have full moderation permissions and option to assign
        other profiles as admins. <br />
        Are you sure you want to unassign this role?
      </p>
      <div className={modalStyles.actionButtons}>
        <Button variant="primary">Yes, unassign</Button>
        <Button variant={'action'} onClick={() => onClose()}>
          No, don't unassign
        </Button>
      </div>
    </div>
  )
}
