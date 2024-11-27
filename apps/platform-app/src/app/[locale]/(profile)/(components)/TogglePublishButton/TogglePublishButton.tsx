/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { Button } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'
import { useEffect, useState } from 'react'
import styles from './TogglePublishButton.module.scss'

import { JobSpecialization } from '@/app/[locale]/(profile)/profile.types'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { publishProfile } from '../../_actions/mutations/publishProfile'
import { unpublishProfile } from '../../_actions/mutations/unpublishProfile'
import { DevTypeButton } from '../Filters/Buttons/DevTypeButton/DevTypeButton'
import VerificationModal from '../VerificationModal/VerificationModal'

interface TogglePublishButtonProps {
  profileId: string
  state: PublishingState
  lastRejectionReason: string | null
}

export const TogglePublishButton = async (props: TogglePublishButtonProps) => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const [showPopup, setShowPopup] = useState(false)
  const { profileId, state, lastRejectionReason } = props

  useEffect(() => {
    if (state === PublishingState.REJECTED) {
      setShowPopup(true)
    }
  }, [])

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
      {showPopup &&
        state !== PublishingState.DRAFT &&
        state !== PublishingState.PENDING && (
          <VerificationModal
            profileStatus={state}
            rejectionReason={lastRejectionReason}
            onClose={async () => setShowPopup(false)}
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
