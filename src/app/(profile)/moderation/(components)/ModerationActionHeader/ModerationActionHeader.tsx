'use client'
import { StateStatus } from '@/app/(profile)/moderation/(components)/StateStatus/StateStatus'
import { Button } from '@/components/Button/Button'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { useModal } from '@/contexts/ModalContext'

import AssignRoleModal from '@/components/AssignRoleModal/AssignRoleModal'
import { Role } from '@prisma/client'
import { ModerationActionHeaderType } from '../../../(components)/types'
import styles from './ModerationActionHeader.module.scss'

export default function ModerationActionHeader({
  userProfile,
  userRoles,
}: ModerationActionHeaderType) {
  const { showModal, closeModal } = useModal()

  return (
    <div className={styles.wrapper}>
      <GoBackButton>Go back</GoBackButton>
      <div className={styles.actionsWrapper}>
        <Button
          variant="action"
          onClick={() => {
            showModal(
              <AssignRoleModal
                userId={userProfile.userId}
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
        <StateStatus profile={userProfile} />
      </div>
    </div>
  )
}
