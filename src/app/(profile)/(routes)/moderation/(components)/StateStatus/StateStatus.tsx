import { formatStateName } from '@/app/(profile)/(components)/FilterTabs/Tab'
import { useModeration } from '@/app/(profile)/_providers/Moderation.provider'
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
  profileId: string
  profileState: PublishingState
}

export function StateStatus({ profileId, profileState }: StateStatusProps) {
  const { showModal, closeModal } = useModal()
  const { handleApprove: approveProfile, handleReject } = useModeration()
  const { runAsync, loading } = useAsyncAction()

  const handleApprove = async (event: React.MouseEvent) => {
    event.stopPropagation()

    await runAsync(
      async () => {
        await approveProfile(profileId)
      },
      {
        successMessage: 'Profile accepted and will be visible on the main page',
      },
    )
  }

  const handleShowRejectModal = (event: React.MouseEvent) => {
    event.stopPropagation()
    showModal(
      <RejectingReasonModal
        profileId={profileId}
        onReject={handleReject}
        onClose={closeModal}
      />,
    )
  }

  if (!(profileState in PublishingState)) return null

  const isPending = profileState === PublishingState.PENDING
  const isApproved = profileState === PublishingState.APPROVED
  const isRejected = profileState === PublishingState.REJECTED

  const formattedName = formatStateName(profileState)

  return (
    <div className={styles.actions}>
      {!isPending && (
        <div
          className={cx({
            [styles.stateStatus]: true,
            [styles.stateAccepted]: profileState === PublishingState.APPROVED,
            [styles.stateRejected]: profileState === PublishingState.REJECTED,
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
