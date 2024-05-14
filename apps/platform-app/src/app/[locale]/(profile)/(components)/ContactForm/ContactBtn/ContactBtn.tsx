'use client'
import { useProfileModel } from '@/app/[locale]/(profile)/_providers/Profile.provider'
import { Button } from '@/components/Button/Button'
import { useModal } from '@/contexts/ModalContext'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import ContactFormModal from '../ContactFormModal/ContactFormModal'

export type SenderData = {
  userId: string
  userEmail: string
  userFullName: string
  userGithubName: string | null
  userProfileId: string
}

const ContactBtn = () => {
  const t = useTranslations('Buttons')
  const { showModal } = useModal()
  const { profile } = useProfileModel()
  const { data: session } = useSession()

  if (!profile || !session || !session.user) {
    return null
  }

  const senderData: SenderData = {
    userId: session.user.id,
    userEmail: session.user.email,
    userFullName: profile.fullName,
    userGithubName: profile.githubUsername,
    userProfileId: profile.id,
  }

  return (
    <div data-test-id="contactBtn">
      <Button
        onClick={() => {
          showModal(<ContactFormModal senderData={senderData} />)
        }}
        variant={'primary'}
      >
        {t('sendMessage')}{' '}
      </Button>
    </div>
  )
}

export default ContactBtn
