import { getUserApplications } from '@/app/[locale]/(profile)/_actions/queries/getUserApplications'
import { I18nNamespaces } from '@/i18n/request'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import InboxClient from './components/InboxClient'
import { type JobNegotiation } from './types'

export default async function InboxPage() {
  const t = await getTranslations(I18nNamespaces.Inbox)

  // Get the authenticated user
  const { user } = await getAuthorizedUser()
  if (!user) {
    redirect(AppRoutes.signIn)
  }

  // Get all applications for this user
  const applications = await getUserApplications()

  // Map applications to the format expected by the InboxClient component
  const formattedApplications: JobNegotiation[] = applications.map((app) => ({
    id: app.id,
    jobId: app.jobId,
    jobTitle: app.jobTitle,
    companyName: app.companyName,
    title: app.jobTitle,
    subtitle: app.companyName,
    lastMessage: app.lastMessage || t('applicationSubmitted'),
    lastMessageTime: app.lastMessageTime,
    unread: app.unread,
    messages: app.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      sender: msg.sender,
      timestamp: msg.timestamp,
    })),
  }))

  return <InboxClient initialApplications={formattedApplications} />
}
