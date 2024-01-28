import {
  useAssignAdminRole,
  useUnassignAdminRole,
} from '@/actions/user/AssignAdminRole'
import { Button } from '@/components/Button/Button'
import modalStyles from '@/components/Modal/Modal.module.scss'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { Role } from '@prisma/client'
import styles from './AssignRole.module.scss'

export default function AssignRoleModal({
  userId,
  userRoles,
  onClose,
}: {
  userId: string
  userRoles: Role[]
  onClose: () => void
}) {
  const assignAdmin = useAssignAdminRole()
  const unassignAdmin = useUnassignAdminRole()
  const { runAsync, loading } = useAsyncAction()

  const handleAssign = async () => {
    await runAsync(() => assignAdmin(userId, userRoles))
    onClose()
  }

  const handleUnassign = async () => {
    await runAsync(() => unassignAdmin(userId, userRoles))
    onClose()
  }

  return !userRoles.includes(Role.MODERATOR) ? (
    <div className={modalStyles.container}>
      <h4>Assign admin role</h4>
      <p className={styles.info}>
        User will have full moderation permissions and option to assign other
        profiles as admins. <br />
        Are you sure you want to assign this role?
      </p>
      <div className={modalStyles.actionButtons}>
        <Button variant="primary" onClick={handleAssign} disabled={loading}>
          Yes, assign
        </Button>
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
        <Button variant="primary" onClick={handleUnassign} disabled={loading}>
          Yes, unassign
        </Button>
        <Button variant={'action'} onClick={() => onClose()}>
          No, don't unassign
        </Button>
      </div>
    </div>
  )
}
