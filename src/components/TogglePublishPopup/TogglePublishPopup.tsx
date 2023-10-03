import { Button } from '../Button/Button'
import styles from './TogglePublishPopup.module.scss'
import React from 'react'

interface PublishProfilePopupProps {
  isPublished: boolean
  onClose: () => void
}

export const PublishProfilePopup = ({
  isPublished,
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
          {isPublished ? 'Congratulations' : 'Your profile’s unpublished'}
        </h2>
        <span className={styles.text}>
          {isPublished ? publishedText : unpublishedText}
        </span>
        <Button onClick={onClose} variant="primary">
          Confirm
        </Button>
      </div>
    </div>
  )
}
