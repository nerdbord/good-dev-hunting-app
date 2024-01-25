/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import styles from './TogglePublishButton.module.scss'
import { Button } from '@/components/Button/Button'
import React, { useState } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishProfilePopup } from '../TogglePublishPopup/TogglePublishPopup'
import { PublishingState } from '@prisma/client'
import { DevTypeButton } from '../Filters/Buttons/DevTypeButton/DevTypeButton'

import { JobSpecialization } from '@/data/frontend/profile/types'

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
      await apiClient.publishMyProfile(profileId)
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
      {state === PublishingState.PENDING ? (
        <DevTypeButton
          onClick={handleButtonClick}
          variant={JobSpecialization.Backend}
          isPressed={false}
        >
          Pending
        </DevTypeButton>
      ) : (
        <Button
          variant={'primary'}
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
