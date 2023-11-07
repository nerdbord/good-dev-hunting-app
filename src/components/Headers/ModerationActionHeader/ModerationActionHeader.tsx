'use client'
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
  const { showModal } = useModal()

  return (
    <div className={styles.wrapper}>
      <GoBackButton>Go back</GoBackButton>
      <div className={styles.actionsWrapper}>
        <Button
          variant="action"
          onClick={() => {
            showModal(<AssignRole profileId={userProfile.id} />)
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
