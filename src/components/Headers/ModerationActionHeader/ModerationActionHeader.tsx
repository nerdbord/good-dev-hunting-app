'use client'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { StateStatus } from '@/components/ProfileList/ModerationProfileListItem'
import { Button } from '@/components/Button/Button'
import { UserProfileHeaderType } from '../types'
import { useModal } from '@/contexts/ModalContext'

import styles from './ModerationActionHeader.module.scss'
import AssignRoleModal from '@/components/AssignRoleModal/AssignRoleModal'

export default function ModerationActionHeader({
  userProfile,
}: UserProfileHeaderType) {
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
                profileId={userProfile.id}
                onClose={closeModal}
              />,
            )
          }}
        >
          Assign admin role
        </Button>
        <div className={styles.vl}></div>
        <StateStatus profile={userProfile} />
      </div>
    </div>
  )
}
