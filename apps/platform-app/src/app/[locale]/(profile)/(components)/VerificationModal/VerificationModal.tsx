'use client'

import { getProfileByUserId } from '@/backend/profile/profile.service'
import { Button } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'
import styles from './VerificationModal.module.scss'
import { GithubIcon } from '@gdh/ui-system/icons'

interface VerificationModalProps {
  profileStatus: PublishingState;
  onClose: () => {}
}

export default async function VerificationModal({
  profileStatus,
  onClose
}: VerificationModalProps) {
  //the text for the modal isn't added to translations yet
  // const t = useTranslations(I18nNamespaces.Buttons)
  // const router = useRouter()

  // const handleEditClick = () => {
  //   router.push(AppRoutes.editProfile)
  // }

  //quick exit from the function if nothing to display
  if (profileStatus === PublishingState.DRAFT || profileStatus === PublishingState.PENDING)
    return <></>

  const approvedText = `Your profile is now up and running. Potential
partnerships will contact via email. Make sure you’re
accepting all external messages!`

  const rejectedText = `On your email we’ve sent you a message
with information what you can improve to
have your profile acceted.`

  const headerText =
    profileStatus === PublishingState.APPROVED
      ? 'Congratulations'
      : 'Your profile was rejected'

  const bodyText = PublishingState.APPROVED ? approvedText : rejectedText

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
