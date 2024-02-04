/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { DevTypeButton } from '@/app/(profile)/(components)/Filters/Buttons/DevTypeButton/DevTypeButton'
import { Button } from '@/components/Button/Button'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import { useState } from 'react'
import { PublishProfilePopup } from '../../../../components/TogglePublishPopup/TogglePublishPopup'

import { publishProfile } from '@/app/(profile)/_actions/publishProfile'
import { JobSpecialization } from '@/app/(profile)/types'

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
      {state === PublishingState.PENDING ? (
        <DevTypeButton
          onClick={() => {
            // onclick bo linter wywala błąd :( przy pustej funkcji
            const lint = ''
          }}
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
