import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { getProfileCurrentState } from '@/app/[locale]/(profile)/profile.helpers'
import { useSession } from 'next-auth/react'
import ContactForm from '../ContactForm'
import styles from './ContactFormModal.module.scss'

export type SenderData = {
  userId: string
  userEmail: string
  userFullName: string
  userGithubName: string | null
  userProfileId: string
}

interface ContactFormModalProps {
  onClose: () => void
}

export default function ContactFormModal(props: ContactFormModalProps) {
  const { profile } = useProfilesStore(getProfileCurrentState)
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ContactForm senderData={senderData} onClose={props.onClose} />
      </div>
    </div>
  )
}
