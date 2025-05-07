'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { GithubIcon } from '@gdh/ui-system/icons'
import { PublishingState } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { findLatestRejectionReason } from '../../_actions/queries/findLatestRejectionReason'
import styles from './VerificationModal.module.scss'

interface VerificationModalProps {
  profileStatus: PublishingState
  onClose: () => void
  profileId: string
}

export default function VerificationModal({
  profileStatus,
  onClose,
  profileId,
}: VerificationModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const t = useTranslations(I18nNamespaces.VerificationModal)

  const headerText =
    profileStatus === PublishingState.APPROVED
      ? t('approvedHeader')
      : t('rejectedHeader')

  const bodyText =
    profileStatus === PublishingState.APPROVED
      ? t('approvedText')
      : t('rejectedText')

  useEffect(() => {
    const getReason = async () => {
      const reason = await findLatestRejectionReason(profileId)
      setRejectionReason(reason)
    }
    getReason()
  }, [])

  return (
    <div className={styles.container} data-testid="publishProfilePopup">
      <h2 className={styles.header}>{headerText}</h2>
      <span className={styles.text}>{bodyText}</span>
      {profileStatus === PublishingState.REJECTED && rejectionReason && (
        <span>Rejection reason: {rejectionReason}</span>
      )}
      <Button onClick={onClose} variant="primary">
        Confirm
        <GithubIcon />
      </Button>
    </div>
  )
}
