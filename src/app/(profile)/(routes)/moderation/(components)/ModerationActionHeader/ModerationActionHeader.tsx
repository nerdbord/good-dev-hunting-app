'use client'
import { StateStatus } from '@/app/(profile)/(routes)/moderation/(components)/StateStatus/StateStatus'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'

import { useUserModel } from '@/app/(auth)/_providers/Auth.provider'
import AssignRoleModal from '@/app/(profile)/(routes)/moderation/(components)/AssignRoleModal/AssignRoleModal'
import { useProfileModel } from '@/app/(profile)/_providers/Profile.provider'
import { Role } from '@prisma/client'
import styles from './ModerationActionHeader.module.scss'

export default function ModerationActionHeader() {
  const { showModal, closeModal } = useModal()
  const { profile } = useProfileModel()
  const { user } = useUserModel()

  const userRoles = user?.roles || []

  if (!profile) return <div>No profile found</div>

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionsWrapper}>
        <Button
          variant="action"
          onClick={() => {
            showModal(
              <AssignRoleModal
                userId={profile.userId}
                userRoles={userRoles}
                onClose={closeModal}
              />,
            )
          }}
        >
          {userRoles.includes(Role.MODERATOR)
            ? 'Unassign admin role'
            : 'Assign admin role'}
        </Button>
        <div className={styles.vl}></div>
        <StateStatus profile={profile} />
      </div>
    </div>
  )
}
