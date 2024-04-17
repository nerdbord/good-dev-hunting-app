'use client'
import { Button } from '@/components/Button/Button'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useState } from 'react'

import modalStyles from '@/components/Modal/Modal.module.scss'
import styles from './RejectingReason.module.scss'

export default function RejectingReasonModal({
  profileId,
  onClose,
  onReject,
}: {
  profileId: string
  onReject: (profileId: string, reason: string) => Promise<void>
  onClose: () => void
}) {
  const [reasonText, setReasonText] = useState('')
  const { runAsync, loading } = useAsyncAction()
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setReasonText(e.target.value)
  }
  const handleReject = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    runAsync(
      async () => {
        await onReject(profileId, reasonText)
        onClose()
      },
      {
        successMessage: 'Profile rejected',
      },
    )
  }

  return (
    <div className={modalStyles.container}>
      <h4>Why are you rejecting the profile?</h4>
      <input
        className={styles.reasonText}
        placeholder="eg. Spelling mistakes in the form"
        onChange={handleTextChange}
      />
      <div className={modalStyles.actionButtons}>
        <Button loading={loading} variant={'primary'} onClick={handleReject}>
          Send and reject
        </Button>
        <Button variant={'action'} disabled={loading} onClick={() => onClose()}>
          Don't send and cancel
        </Button>
      </div>
    </div>
  )
}
