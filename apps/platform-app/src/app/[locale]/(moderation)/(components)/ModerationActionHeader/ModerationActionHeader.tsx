'use client'

import { useModal } from '@/contexts/ModalContext'
import { Button } from '@gdh/ui-system'

import { Role } from '@prisma/client'

import AssignRoleModal from '@/app/[locale]/(moderation)/(components)/AssignRoleModal/AssignRoleModal'
import { StateStatus } from '@/app/[locale]/(moderation)/(components)/StateStatus/StateStatus'
import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { getModerationCurrentState } from '@/app/[locale]/(moderation)/moderation.helpers'
import styles from './ModerationActionHeader.module.scss'

interface ModerationActionHeaderProps {
  profileOwnerRoles: Role[]
}

export default function ModerationActionHeader(
  props: ModerationActionHeaderProps,
) {
  const { showModal, closeModal } = useModal()
  const { moderationProfile } = useModerationProfilesStore(
    getModerationCurrentState,
  )

  if (!moderationProfile) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionsWrapper}>
        <Button
          variant="action"
          onClick={() => {
            showModal(
              <AssignRoleModal
                userId={moderationProfile.userId}
                userRoles={props.profileOwnerRoles}
                onClose={closeModal}
              />,
            )
          }}
        >
          {props.profileOwnerRoles.includes(Role.MODERATOR)
            ? 'Unassign admin role'
            : 'Assign admin role'}
        </Button>
        <div className={styles.vl}></div>
        <StateStatus
          profileId={moderationProfile.id}
          profileState={moderationProfile.state}
        />
      </div>
    </div>
  )
}
