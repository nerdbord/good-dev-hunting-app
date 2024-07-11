import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { useSession } from 'next-auth/react'
import ContactForm from '../ContactForm'
import styles from './ContactFormModal.module.scss'
import { getProfileCurrentState } from '@/app/[locale]/(profile)/profile.helpers'

export type SenderData = {
  userId: string
  userEmail: string
  userFullName: string
  userGithubName: string | null
  userProfileId: string
}

export default function ContactFormModal() {
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
        <ToastContextProvider>
          <ContactForm senderData={senderData} />
        </ToastContextProvider>
      </div>
    </div>
  )
}
