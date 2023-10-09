import { PublishingState } from '@prisma/client'
import { Button } from '../Button/Button'
import styles from './TogglePublishPopup.module.scss'
import React from 'react'

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

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.header}>
          {state === PublishingState.APPROVED ? 'Congratulations' : 'Your profile’s unpublished'}
        </h2>
        <span className={styles.text}>
          {state === PublishingState.APPROVED ? publishedText : unpublishedText}
        </span>
        <Button onClick={onClose} variant="primary">
          Confirm
        </Button>
      </div>
    </div>
  )
}
