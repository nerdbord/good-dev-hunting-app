/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@/components/Button/Button'
import { PublishProfilePopup } from '@/components/TogglePublishPopup/TogglePublishPopup'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import { useState } from 'react'
import styles from './TogglePublishButton.module.scss'

import { publishProfile } from '@/app/(profile)/_actions/publishProfile'
import { JobSpecialization } from '@/app/(profile)/types'
import { DevTypeButton } from '../Filters/Buttons/DevTypeButton/DevTypeButton'

interface TogglePublishButtonProps {
  profileId: string
  state: PublishingState
}

export const TogglePublishButton = (props: TogglePublishButtonProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const { profileId, state } = props

  const { loading, runAsync } = useAsyncAction()

  const handleButtonClick = async () => {
    await runAsync(async () => {
      await publishProfile(profileId)
      setShowPopup(true)
    })
  }

  return (
    <div>
      {showPopup && !loading && (
        <PublishProfilePopup
          state={state}
          onClose={() => setShowPopup(false)}
        />
      )}
      {state === PublishingState.REJECTED ? (
        <span className={styles.rejectedInfo}>Rejected</span>
      ) : state === PublishingState.PENDING ? (
        <DevTypeButton variant={JobSpecialization.Backend} isPressed={false}>
          Pending
        </DevTypeButton>
      ) : (
        <Button
          variant={'secondary'}
          loading={loading}
          onClick={handleButtonClick}
          dataTestId="publishProfileButton"
        >
          {state === PublishingState.APPROVED
            ? 'Unpublish profile'
            : 'Publish profile'}
        </Button>
      )}
    </div>
  )
}
