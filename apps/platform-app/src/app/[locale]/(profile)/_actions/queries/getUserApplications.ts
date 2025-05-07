'use server'

import { getUserApplications as getApplications } from '@/backend/application/application.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { type Application, type Message } from '@prisma/client'

export interface ApplicationMessage {
  id: string
  content: string
  timestamp: string
  sender: 'user' | 'company'
}

export interface JobNegotiation {
  id: string
  jobId: string
  jobTitle: string
  companyName: string
  lastMessage: string
  lastMessageTime: string
  unread: boolean
  messages: ApplicationMessage[]
}

// Define the extended types to match what's returned from the service
type JobWithName = {
  jobName: string
}

type UserWithProfile = {
  id: string
  profile?: {
    fullName: string
  } | null
}

type ApplicationWithDetails = Application & {
  job: JobWithName
  messages: Message[]
  applicant: UserWithProfile
  jobOwner: UserWithProfile
}

/**
 * Fetches all job applications for the authenticated user
 */
export async function getUserApplications(): Promise<JobNegotiation[]> {
  try {
    const { user } = await getAuthorizedUser()

    if (!user) {
      return []
    }

    const applications = (await getApplications(
      user.id,
    )) as ApplicationWithDetails[]

    // Transform applications to the format expected by the inbox
    return applications.map((app) => {
      // Get the latest message for the conversation summary
      const latestMessage =
        app.messages.length > 0 ? app.messages[app.messages.length - 1] : null

      // Create a readable timestamp
      const timestamp = latestMessage
        ? new Date(latestMessage.sentAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : ''

      // Transform messages to the expected format
      const formattedMessages: ApplicationMessage[] = app.messages.map(
        (msg) => ({
          id: msg.id,
          content: msg.content,
          timestamp: new Date(msg.sentAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }),
          sender: msg.senderId === user.id ? 'user' : 'company',
        }),
      )

      // Determine the company name (job owner's name)
      const companyName = app.jobOwner?.profile?.fullName || 'Unknown'

      return {
        id: app.id,
        jobId: app.jobId,
        jobTitle: app.job.jobName,
        companyName,
        lastMessage:
          latestMessage?.content?.substring(0, 50) +
            (latestMessage?.content && latestMessage.content.length > 50
              ? '...'
              : '') || '',
        lastMessageTime: timestamp,
        unread: false, // We could implement unread tracking in the future
        messages: formattedMessages,
      }
    })
  } catch (error) {
    console.error('Error fetching user applications:', error)
    return []
  }
}
