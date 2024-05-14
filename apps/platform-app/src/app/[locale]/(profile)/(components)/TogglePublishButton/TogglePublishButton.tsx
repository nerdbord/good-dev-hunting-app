/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@/components/Button/Button'
import { PublishProfilePopup } from '@/components/TogglePublishPopup/TogglePublishPopup'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import { useState } from 'react'
import styles from './TogglePublishButton.module.scss'

import { JobSpecialization } from '@/app/[locale]/(profile)/profile.types'
import { useTranslations } from 'next-intl'
import { publishProfile } from '../../_actions/mutations/publishProfile'
import { unpublishProfile } from '../../_actions/mutations/unpublishProfile'
import { DevTypeButton } from '../Filters/Buttons/DevTypeButton/DevTypeButton'

interface TogglePublishButtonProps {
  profileId: string
  state: PublishingState
}

export const TogglePublishButton = (props: TogglePublishButtonProps) => {
  const t = useTranslations('Buttons')
  const [showPopup, setShowPopup] = useState(false)
  const { profileId, state } = props

  const { loading, runAsync } = useAsyncAction()

  const handleButtonClick = async () => {
    switch (state) {
      case PublishingState.APPROVED:
        await runAsync(async () => {
          await unpublishProfile(profileId)
          setShowPopup(true)
        })
        return
      case PublishingState.DRAFT:
        await runAsync(async () => {
          await publishProfile(profileId)
          setShowPopup(true)
        })
        return
      case PublishingState.REJECTED:
        await runAsync(async () => {
          await publishProfile(profileId)
          setShowPopup(true)
        })
        return
      default:
        throw Error('Wrong profile action')
    }
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
          {t('pending')}{' '}
        </DevTypeButton>
      ) : (
        <Button
          variant={'secondary'}
          loading={loading}
          onClick={handleButtonClick}
          dataTestId="publishProfileButton"
        >
          {state === PublishingState.APPROVED
            ? t('unpublish')
            : t('publishProfile')}
        </Button>
      )}
    </div>
  )
}
