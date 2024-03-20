import { formatStateName } from '@/app/(profile)/(components)/FilterTabs/Tab'
import { approveProfile } from '@/app/(profile)/_actions/approveProfile'
import { type ProfileModel } from '@/app/(profile)/types'
import AcceptIcon from '@/assets/icons/AcceptIcon'
import RejectIcon from '@/assets/icons/RejectIcon'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import classNames from 'classnames/bind'
import RejectingReasonModal from '../RejectingReasonModal/RejectingReasonModal'
import styles from './StateStatus.module.scss'

const cx = classNames.bind(styles)

type StateStatusProps = {
  profile: ProfileModel
}

export function StateStatus({ profile }: StateStatusProps) {
  const { id, state } = profile
  const { showModal, closeModal } = useModal()
  const { runAsync, loading } = useAsyncAction()

  const handleApprove = async () => {
    await runAsync(
      async () => {
        await approveProfile(id, { state: PublishingState.APPROVED })
      },
      {
        successMessage: 'Profile accepted and will be visible on the main page',
      },
    )
  }

  const handleShowRejectModal = () => {
    showModal(<RejectingReasonModal profileId={id} onClose={closeModal} />)
  }

  if (!(state in PublishingState)) return null

  const isPending = state === PublishingState.PENDING
  const isApproved = state === PublishingState.APPROVED
  const isRejected = state === PublishingState.REJECTED

  const formattedName = formatStateName(state)

  return (
    <div className={styles.actions}>
      {!isPending && (
        <div
          className={cx({
            [styles.stateStatus]: true,
            [styles.stateAccepted]: state === PublishingState.APPROVED,
            [styles.stateRejected]: state === PublishingState.REJECTED,
          })}
        >
          {formattedName}
        </div>
      )}
      {isPending && (
        <>
          <Button
            variant="action"
            loading={loading}
            onClick={handleApprove}
            disabled={!isRejected && !isPending}
          >
            Accept <AcceptIcon />
          </Button>
          <Button
            variant="action"
            loading={loading}
            onClick={handleShowRejectModal}
            disabled={!isApproved && !isPending} // modified condition
          >
            Reject <RejectIcon />
          </Button>
        </>
      )}
      {isRejected && (
        <Button
          variant="action"
          loading={loading}
          onClick={handleApprove}
          disabled={!isRejected && !isPending}
        >
          Accept <AcceptIcon />
        </Button>
      )}

      {isApproved && (
        <Button
          variant="action"
          loading={loading}
          onClick={handleShowRejectModal}
          disabled={!isApproved && !isPending} // modified condition
        >
          Reject <RejectIcon />
        </Button>
      )}
    </div>
  )
}
