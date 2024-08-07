import { ProfileVerification } from '@/app/[locale]/(profile)/profile.helpers'
import { Button } from '@gdh/ui-system'
import { type PublishingState } from '@prisma/client'
import styles from './TogglePublishPopup.module.scss'

interface PublishProfilePopupProps {
  state: PublishingState
  onClose: () => void
}

export const PublishProfilePopup = ({
  state,
  onClose,
}: PublishProfilePopupProps) => {
  const publishedText = `Your profile is now up and running. Potential
partnerships will contact via email. Make sure you’re
accepting all external messages!`

  const unpublishedText = `Your profile is now not visible to the public.
You can republish it at anytime.`

  const pendingText = `Your profile is currently under review by our administration team. 
We will notify you once the review is complete. Thank you for your patience.`

  const headerText = ProfileVerification.isApproved(state)
    ? 'Congratulations'
    : ProfileVerification.isPending(state)
      ? 'Your profile is under review'
      : 'Your profile is unpublished'

  const bodyText = ProfileVerification.isApproved(state)
    ? publishedText
    : ProfileVerification.isPending(state)
      ? pendingText
      : unpublishedText

  return (
    <div className={styles.overlay}>
      <div className={styles.container} data-testid="publishProfilePopup">
        <h2 className={styles.header}>{headerText}</h2>
        <span className={styles.text}>{bodyText}</span>
        <Button onClick={onClose} variant="primary">
          Confirm
        </Button>
      </div>
    </div>
  )
}
