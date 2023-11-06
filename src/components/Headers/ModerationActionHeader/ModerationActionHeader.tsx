'use client'
import { useState } from 'react'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { StateStatus } from '@/components/ProfileList/ModerationProfileListItem'
import { Button } from '@/components/Button/Button'
import { UserProfileHeaderType } from '../types'
import { useModal } from '@/contexts/ModalContext'

import styles from './ModerationActionHeader.module.scss'
import AssignRole from '@/components/AssignRole/AssignRole'

export default function ModerationActionHeader({
  userProfile,
}: UserProfileHeaderType) {
  const { isModalVisible, showModal } = useModal()
  const [isAssignModal, showAssignModal] = useState(false)

  return (
    <div className={styles.wrapper}>
      <GoBackButton>Go back</GoBackButton>
      <div className={styles.actionsWrapper}>
        <Button
          variant="action"
          onClick={() => {
            showAssignModal(true)
            showModal(true)
          }}
        >
          Assign admin role
        </Button>
        <div className={styles.vl}></div>
        <StateStatus profile={userProfile} />
      </div>
      {isModalVisible && isAssignModal && (
        <AssignRole
          profileId={userProfile.id}
          showAssignModal={showAssignModal}
        />
      )}
    </div>
  )
}
