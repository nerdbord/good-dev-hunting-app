'use client'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { apiClient } from '@/lib/apiClient'
import { PublishingState } from '@prisma/client'
import { useState } from 'react'
import { Button } from '../Button/Button'

import modalStyles from '@/components/Modal/Modal.module.scss'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import styles from './RejectingReason.module.scss'

export default function RejectingReasonModal({
  profileId,
  userEmail,
  onClose,
}: {
  profileId: string
  userEmail: string
  onClose: () => void
}) {
  const [reasonText, setReasonText] = useState('')
  const { addToast } = useToast()
  const { runAsync, loading } = useAsyncAction()

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setReasonText(e.target.value)
  }
  const handleReject = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    runAsync(async () => {
      await apiClient.updateProfileState(profileId, {
        state: PublishingState.REJECTED,
      })
      await apiClient.createRejectionReason(profileId, {
        reason: reasonText,
      })
      addToast(
        'Profile rejected and will not be visible on the main page',
        ToastStatus.INVALID,
      )
      onClose()
    })
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
        <Button variant={'action'} onClick={() => onClose()}>
          Don't send and cancel
        </Button>
      </div>
    </div>
  )
}
