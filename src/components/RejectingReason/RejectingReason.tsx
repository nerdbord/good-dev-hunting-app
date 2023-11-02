'use client'
import { useState } from 'react'
import { Button } from '../Button/Button'
import Modal from '../Modal/Modal'
import { useModal } from '@/contexts/ModalContext'
import combineClasses from '@/utils/combineClasses'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { apiClient } from '@/lib/apiClient'
import { PublishingState } from '@prisma/client'

import { Inter, IBM_Plex_Sans } from 'next/font/google'
import styles from './RejectingReason.module.scss'
import { ToastStatus, useToast } from '@/contexts/ToastContext'

const inter = Inter({ subsets: ['latin'], weight: '500' })
const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400'] })

export default function RejectingReason() {
  const { profileId, showRejectModal, setShowRejectModal } = useModal()
  const [reasonText, setReasonText] = useState('')
  const { addToast } = useToast()
  const { runAsync } = useAsyncAction()

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
    })
    setShowRejectModal(false)
  }

  if (!showRejectModal) return <></>
  return (
    <Modal>
      <div className={styles.container}>
        <h4 className={inter.className}>Why are you rejecting the profile?</h4>
        <input
          className={combineClasses([styles.reasonText, ibm.className])}
          placeholder="eg. Spelling mistakes in the form"
          onChange={handleTextChange}
        />
        <div className={styles.actionButtons}>
          <Button variant={'primary'} onClick={handleReject}>
            Send and reject
          </Button>
          <Button variant={'action'} onClick={() => setShowRejectModal(false)}>
            Don't send and cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
