'use client'

import { getProfileByUserId } from '@/backend/profile/profile.service'
import { Button } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'
import styles from './VerificationModal.module.scss'
import { GithubIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { I18nNamespaces } from '@/i18n'

interface VerificationModalProps {
  profileStatus: PublishingState;
  rejectionReason?: string;
  onClose: () => void
}

export default async function VerificationModal({
  profileStatus,
  onClose
}: VerificationModalProps) {
  const t = useTranslations(I18nNamespaces.VerificationModal)

  // const router = useRouter()
  // const handleEditClick = () => {
  //   router.push(AppRoutes.editProfile)
  // }
  // //quick exit from the function if nothing to display
  // if (profileStatus === PublishingState.DRAFT || profileStatus === PublishingState.PENDING)
  //   return null

  


  const headerText =
    profileStatus === PublishingState.APPROVED
      ? t("approvedHeader")
      : t("rejectedHeader")

  const bodyText = profileStatus === PublishingState.APPROVED ? t('approvedText') : t("rejectedText")

  return (
    <div className={styles.overlay}>
      <div className={styles.container} data-testid="publishProfilePopup">
        <h2 className={styles.header}>{headerText}</h2>
        <span className={styles.text}>{bodyText}</span>
        <Button onClick={onClose} variant="primary">
          Confirm
          <GithubIcon/>
        </Button>
      </div>
    </div>
  )
}
