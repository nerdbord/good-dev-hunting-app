'use client'

import { I18nNamespaces } from '@/i18n/request'
import { Accordion, Button } from '@gdh/ui-system'
import { GithubIcon } from '@gdh/ui-system/icons'
import { PublishingState } from '@prisma/client'
import { useTranslations } from 'next-intl'
import styles from './VerificationModal.module.scss'

interface VerificationModalProps {
  profileStatus: PublishingState
  rejectionReason?: string | null
  onClose: () => void
}

export default async function VerificationModal({
  profileStatus,
  onClose,
  rejectionReason,
}: VerificationModalProps) {
  const t = useTranslations(I18nNamespaces.VerificationModal)

  const headerText =
    profileStatus === PublishingState.APPROVED
      ? t('approvedHeader')
      : t('rejectedHeader')

  const bodyText =
    profileStatus === PublishingState.APPROVED
      ? t('approvedText')
      : t('rejectedText')

  return (
    <div className={styles.overlay}>
      <div className={styles.container} data-testid="publishProfilePopup">
        <h2 className={styles.header}>{headerText}</h2>
        <span className={styles.text}>{bodyText}</span>
        {profileStatus === PublishingState.REJECTED && rejectionReason && (
          <Accordion title={'Show rejection reason'}>
            {rejectionReason}
          </Accordion>
        )}
        <Button onClick={onClose} variant="primary">
          Confirm
          <GithubIcon />
        </Button>
      </div>
    </div>
  )
}
