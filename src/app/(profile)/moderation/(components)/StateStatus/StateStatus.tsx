import { approveProfile } from '@/app/(profile)/_actions/approveProfile'
import RejectingReasonModal from '@/app/(profile)/moderation/(components)/RejectingReasonModal/RejectingReasonModal'
import { ProfileModel } from '@/app/(profile)/types'
import AcceptIcon from '@/assets/icons/AcceptIcon'
import RejectIcon from '@/assets/icons/RejectIcon'
import { useModal } from '@/contexts/ModalContext'
import { useToast } from '@/contexts/ToastContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import classNames from 'classnames/bind'
import { Button } from '../../../../../components/Button/Button'
import { formatStateName } from '../../../../../components/FilterTabs/Tab'
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
            runAsync(
              async () => {
                await approveProfile(id, {
                  state: PublishingState.APPROVED,
                })
              },
              {
                successMessage:
                  'Profile accepted and will be visible on the main page',
              },
            )
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
