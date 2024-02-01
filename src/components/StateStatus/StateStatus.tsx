import AcceptIcon from '@/assets/icons/AcceptIcon'
import RejectIcon from '@/assets/icons/RejectIcon'
import { useModal } from '@/contexts/ModalContext'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { apiClient } from '@/lib/apiClient'
import { PublishingState } from '@prisma/client'
import classNames from 'classnames/bind'
import { Button } from '../Button/Button'
import { formatStateName } from '../FilterTabs/Tab'
import RejectingReasonModal from '../RejectingReasonModal/RejectingReasonModal'
import styles from './StateStatus.module.scss'

const cx = classNames.bind(styles)

type StateStatusProps = {
  profile: ProfileModel
}

export function StateStatus({ profile }: StateStatusProps) {
  const { id, state } = profile
  const { addToast } = useToast()
  const { showModal, closeModal } = useModal()
  const { runAsync, loading } = useAsyncAction()

  const handleClose = () => {
    closeModal()
  }

  if (!(state in PublishingState)) return <></>
  if (state === PublishingState.PENDING) {
    return (
      <div className={styles.actions}>
        <Button
          variant="action"
          loading={loading}
          onClick={() => {
            runAsync(async () => {
              await apiClient.updateProfileState(id, {
                state: PublishingState.APPROVED,
              })
              addToast(
                'Profile accepted and will be visible on the main page within 24h',
                ToastStatus.SUCCESS,
              )
            })
          }}
        >
          Accept
          <AcceptIcon />
        </Button>
        <Button
          variant="action"
          onClick={() => {
            showModal(
              <RejectingReasonModal
                profileId={profile.id}
                userEmail={profile.userEmail}
                onClose={handleClose}
              />,
            )
          }}
        >
          Reject
          <RejectIcon />
        </Button>
      </div>
    )
  }

  const formattedName = formatStateName(state)
  return (
    <div
      className={cx({
        [styles.stateStatus]: true,
        [styles.stateAccepted]: state === PublishingState.APPROVED,
        [styles.stateRejected]: state === PublishingState.REJECTED,
      })}
    >
      {formattedName}
    </div>
  )
}
