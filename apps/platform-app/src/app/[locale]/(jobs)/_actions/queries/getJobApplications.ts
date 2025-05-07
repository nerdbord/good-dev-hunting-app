'use server'

import { getUserApplications } from '@/backend/application/application.service'
import { getJobById } from '@/backend/job/job.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { type Application, type Message, type User } from '@prisma/client'

export interface ApplicantMessage {
  id: string
  content: string
  timestamp: string
  sender: 'applicant' | 'recruiter'
}

export interface JobApplicant {
  id: string // Application ID
  applicantId: string // User ID
  name: string // User's name
  title: string // User's title/role
  // subtitle: string  // User's summary
  avatar: string // User's avatar URL
  lastMessage: string // Latest message preview
  lastMessageTime: string // Formatted timestamp
  messages: ApplicantMessage[] // All messages in the conversation
}

// Define the extended types to match what's returned from the service
interface Profile {
  fullName: string
  slug: string
  position: string
}

interface UserWithProfile extends User {
  profile: Profile | null
}

interface ApplicationWithUserData extends Application {
  messages: Message[]
  job: {
    jobName: string
  }
  applicant: UserWithProfile
  jobOwner: UserWithProfile
}

/**
 * Gets all applications for a specific job that the authenticated user owns
 */
export async function getJobApplications(
  jobId: string,
): Promise<JobApplicant[]> {
  try {
    const { user } = await getAuthorizedUser()

    if (!user) {
      return []
    }

    // Get the job to verify ownership
    const job = await getJobById(jobId)
    if (!job || job.createdById !== user.id) {
      return []
    }

    // Get all applications for this user (includes both as applicant and owner)
    const applications = (await getUserApplications(
      user.id,
    )) as unknown as ApplicationWithUserData[]

    // Filter for applications related to this specific job
    const jobApplications = applications.filter((app) => app.jobId === jobId)

    // Transform to the format expected by the UI
    return jobApplications.map((app) => {
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

      // Format all messages with proper sender information
      const formattedMessages: ApplicantMessage[] = app.messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        timestamp: new Date(msg.sentAt).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
        sender: msg.senderId === app.applicantId ? 'applicant' : 'recruiter',
      }))

      // Get applicant information from the properly typed data
      const applicantName =
        app.applicant?.profile?.fullName || 'Unknown Applicant'

      return {
        id: app.id,
        applicantId: app.applicantId,
        name: applicantName,
        title: app.applicant?.profile?.position || 'Unknown',
        // subtitle: app.applicant.profile?.position || 'Unknown',
        avatar: app.applicant.avatarUrl || '/avatar-placeholder.png', // Default avatar
        lastMessage:
          latestMessage?.content?.substring(0, 50) +
            (latestMessage?.content && latestMessage.content.length > 50
              ? '...'
              : '') || '',
        lastMessageTime: timestamp,
        messages: formattedMessages,
      }
    })
  } catch (error) {
    console.error('Error fetching job applications:', error)
    return []
  }
}
