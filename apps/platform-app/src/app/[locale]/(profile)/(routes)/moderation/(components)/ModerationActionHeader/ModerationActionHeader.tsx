'use client'
import { StateStatus } from '@/app/[locale]/(profile)/(routes)/moderation/(components)/StateStatus/StateStatus'
import { Button } from '@gdh/ui-system'
import { useModal } from '@/contexts/ModalContext'

import AssignRoleModal from '@/app/[locale]/(profile)/(routes)/moderation/(components)/AssignRoleModal/AssignRoleModal'
import { useProfileModel } from '@/app/[locale]/(profile)/_providers/Profile.provider'
import { Role } from '@prisma/client'

import styles from './ModerationActionHeader.module.scss'

interface ModerationActionHeaderProps {
  profileOwnerRoles: Role[]
}

export default function ModerationActionHeader(
  props: ModerationActionHeaderProps,
) {
  const { showModal, closeModal } = useModal()
  const { profile } = useProfileModel()

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
        <StateStatus profileId={profile.id} profileState={profile.state} />
      </div>
    </div>
  )
}
