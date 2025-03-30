import {
  sendApplicationConfirmationToApplicant,
  sendNewApplicationNotificationToOwner,
} from '@/backend/mailing/mailing.service'
import { prisma } from '@/lib/prismaClient'
import { decryptMessage, encryptMessage } from '@/utils/messageEncryption'
import { addSpecialElementToMessage } from '@/utils/messageParser'
import { AppRoutes } from '@/utils/routes'
import { type Application, type Message } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export interface ApplicationCreateInput {
  jobId: string
  applicantId: string
  jobOwnerId: string
  initialMessage: string
  cvUrl?: string
}

export interface ApplicationWithMessages extends Application {
  messages: Message[]
}

/**
 * Creates a new job application with an initial message
 */
export async function createApplication(
  data: ApplicationCreateInput,
): Promise<ApplicationWithMessages> {
  const { jobId, applicantId, jobOwnerId, initialMessage, cvUrl } = data

  // Format the message with CV button if available
  const formattedMessage = cvUrl
    ? addSpecialElementToMessage(initialMessage, cvUrl, 'cvButton')
    : initialMessage

  // Check if an application already exists for this user and job
  const existingApplication = await prisma.application.findFirst({
    where: {
      jobId,
      applicantId,
    },
    include: {
      messages: true,
    },
  })

  if (existingApplication) {
    // Application already exists, add a new message instead
    const newMessage = await prisma.message.create({
      data: {
        content: encryptMessage(formattedMessage),
        applicationId: existingApplication.id,
        senderId: applicantId,
      },
    })

    // Refresh the application with messages including the new one
    const updatedApplication = await prisma.application.findUnique({
      where: {
        id: existingApplication.id,
      },
      include: {
        messages: true,
      },
    })

    if (!updatedApplication) {
      throw new Error('Failed to retrieve updated application')
    }

    revalidatePath(AppRoutes.inbox)

    return updatedApplication
  }

  // Get job and user details needed for notifications
  const jobDetails = await prisma.job.findUnique({
    where: { id: jobId },
    select: {
      jobName: true,
      createdBy: {
        select: {
          email: true,
          profile: {
            select: { fullName: true },
          },
        },
      },
    },
  })

  const applicantDetails = await prisma.user.findUnique({
    where: { id: applicantId },
    select: {
      email: true,
      profile: {
        select: { fullName: true },
      },
    },
  })

  // Create new application with initial message
  const application = await prisma.application.create({
    data: {
      jobId,
      applicantId,
      jobOwnerId,
      messages: {
        create: {
          content: encryptMessage(formattedMessage),
          senderId: applicantId,
        },
      },
    },
    include: {
      messages: true,
    },
  })

  revalidatePath(AppRoutes.inbox)

  // Send email notifications
  if (jobDetails && applicantDetails) {
    // Create application URL for job owner
    const ownerApplicationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${jobId}/applications?application=${application.id}`

    // Create application URL for applicant
    const applicantApplicationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/my-profile/inbox?negotiation=${application.id}`

    // Get display names
    const ownerName =
      jobDetails.createdBy?.profile?.fullName ||
      jobDetails.createdBy?.email?.split('@')[0] ||
      'Job Owner'
    const applicantName =
      applicantDetails.profile?.fullName ||
      applicantDetails.email?.split('@')[0] ||
      'Applicant'

    try {
      // Send notification to job owner about new application
      await sendNewApplicationNotificationToOwner(
        jobDetails.createdBy?.email || '',
        ownerName,
        applicantName,
        jobDetails.jobName,
        ownerApplicationUrl,
      )

      // Send confirmation to applicant
      await sendApplicationConfirmationToApplicant(
        applicantDetails.email,
        applicantName,
        jobDetails.jobName,
        ownerName,
        applicantApplicationUrl,
      )
    } catch (error) {
      // Log error but don't fail the application creation
      console.error('Error sending application notifications:', error)
    }
  }

  return application
}

/**
 * Gets all applications for a user (either as applicant or job owner)
 */
export async function getUserApplications(
  userId: string,
): Promise<ApplicationWithMessages[]> {
  const applications = await prisma.application.findMany({
    where: {
      OR: [{ applicantId: userId }, { jobOwnerId: userId }],
    },
    include: {
      job: {
        select: {
          jobName: true,
        },
      },
      messages: {
        orderBy: {
          sentAt: 'asc',
        },
      },
      applicant: {
        select: {
          id: true,
          email: true,
          avatarUrl: true,
          profile: {
            select: {
              fullName: true,
              slug: true,
              position: true,
            },
          },
        },
      },
      jobOwner: {
        select: {
          id: true,
          email: true,
          avatarUrl: true,
          profile: {
            select: {
              fullName: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  // Decrypt message content for all applications
  return applications.map((app) => {
    const decryptedMessages = app.messages.map((msg) => ({
      ...msg,
      content: decryptMessage(msg.content),
    }))

    return {
      ...app,
      messages: decryptedMessages,
    }
  })
}

/**
 * Gets a specific application by ID
 */
export async function getApplicationById(
  id: string,
): Promise<ApplicationWithMessages | null> {
  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      job: {
        select: {
          id: true,
          jobName: true,
        },
      },
      messages: {
        orderBy: {
          sentAt: 'asc',
        },
      },
      applicant: {
        select: {
          id: true,
          email: true,
          avatarUrl: true,
          profile: {
            select: {
              fullName: true,
              slug: true,
              position: true,
            },
          },
        },
      },
      jobOwner: {
        select: {
          id: true,
          email: true,
          avatarUrl: true,
          profile: {
            select: {
              fullName: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  if (!application) return null

  // Decrypt message content
  const decryptedMessages = application.messages.map((msg) => ({
    ...msg,
    content: decryptMessage(msg.content),
  }))

  return {
    ...application,
    messages: decryptedMessages,
  }
}

/**
 * Adds a new message to an existing application
 */
export async function addMessageToApplication(
  applicationId: string,
  senderId: string,
  content: string,
): Promise<Message> {
  // Encrypt the message content before storing
  const encryptedContent = encryptMessage(content)

  const message = await prisma.message.create({
    data: {
      content: encryptedContent,
      applicationId,
      senderId,
    },
  })

  // Update the application's updatedAt timestamp
  await prisma.application.update({
    where: { id: applicationId },
    data: { updatedAt: new Date() },
  })

  revalidatePath(AppRoutes.inbox)

  return message
}

/**
 * Checks if a user has access to an application (either as applicant or job owner)
 */
export async function userHasAccessToApplication(
  userId: string,
  applicationId: string,
): Promise<boolean> {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { applicantId: true, jobOwnerId: true },
  })

  if (!application) return false

  return application.applicantId === userId || application.jobOwnerId === userId
}

/**
 * Gets users with unread messages in their applications
 * @returns Array of users with unread message counts, separated by role
 */
export async function getUsersWithUnreadMessages(): Promise<{
  applicants: Array<{
    userId: string
    email: string
    username: string
    unreadCount: number
  }>
  jobOwners: Array<{
    userId: string
    email: string
    username: string
    unreadCount: number
  }>
}> {
  // This is a placeholder implementation that needs to be customized based on how
  // your application tracks read/unread messages. For now, we're assuming all messages
  // are unread for demonstration purposes.

  // Get all applications with their messages and related users
  const applications = await prisma.application.findMany({
    include: {
      messages: {
        orderBy: {
          sentAt: 'desc',
        },
        take: 100, // Limit to most recent messages
      },
      applicant: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              fullName: true,
            },
          },
        },
      },
      jobOwner: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              fullName: true,
            },
          },
        },
      },
    },
  })

  // Process applications to aggregate unread messages by user role
  const applicantUnreadMap = new Map<
    string,
    {
      email: string
      username: string
      unreadCount: number
    }
  >()

  const jobOwnerUnreadMap = new Map<
    string,
    {
      email: string
      username: string
      unreadCount: number
    }
  >()

  // In a real implementation, you would have a way to track read/unread status
  // For now, we'll assume messages sent to a user in the last 24 hours are unread
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)

  for (const app of applications) {
    // Process messages for the applicant (messages from job owner to applicant)
    const unreadMessagesForApplicant = app.messages.filter(
      (msg) => msg.senderId === app.jobOwnerId && msg.sentAt > oneDayAgo,
    )

    if (unreadMessagesForApplicant.length > 0) {
      const userId = app.applicantId
      const currentData = applicantUnreadMap.get(userId) || {
        email: app.applicant.email,
        username:
          app.applicant.profile?.fullName || app.applicant.email.split('@')[0],
        unreadCount: 0,
      }

      currentData.unreadCount += unreadMessagesForApplicant.length
      applicantUnreadMap.set(userId, currentData)
    }

    // Process messages for the job owner (messages from applicant to job owner)
    const unreadMessagesForJobOwner = app.messages.filter(
      (msg) => msg.senderId === app.applicantId && msg.sentAt > oneDayAgo,
    )

    if (unreadMessagesForJobOwner.length > 0) {
      const userId = app.jobOwnerId
      const currentData = jobOwnerUnreadMap.get(userId) || {
        email: app.jobOwner.email,
        username:
          app.jobOwner.profile?.fullName || app.jobOwner.email.split('@')[0],
        unreadCount: 0,
      }

      currentData.unreadCount += unreadMessagesForJobOwner.length
      jobOwnerUnreadMap.set(userId, currentData)
    }
  }

  // Convert the maps to arrays of results
  return {
    applicants: Array.from(applicantUnreadMap.entries()).map(
      ([userId, data]) => ({
        userId,
        ...data,
      }),
    ),
    jobOwners: Array.from(jobOwnerUnreadMap.entries()).map(
      ([userId, data]) => ({
        userId,
        ...data,
      }),
    ),
  }
}

/**
 * Expires applications that have no responses from job owners after 7 days
 * @returns Number of applications that were expired
 */
export async function expireInactiveApplications(): Promise<{ count: number }> {
  // Find applications that only have 1 message (the initial application)
  // and are older than 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // First, identify applications that only have a single message
  // and are older than 7 days
  const inactiveApplications = await prisma.application.findMany({
    where: {
      createdAt: {
        lt: sevenDaysAgo,
      },
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
      messages: {
        orderBy: {
          sentAt: 'asc',
        },
        take: 2, // Just need to check if there's more than 1
      },
      job: {
        select: {
          jobName: true,
        },
      },
      applicant: {
        select: {
          email: true,
          profile: {
            select: {
              fullName: true,
            },
          },
        },
      },
    },
  })

  // Filter for applications where:
  // 1. Only one message exists (the initial application)
  // 2. That message was sent by the applicant, not the job owner
  const expirableApplications = inactiveApplications.filter(
    (app) =>
      app._count.messages === 1 && app.messages[0].senderId === app.applicantId,
  )

  // We don't actually delete applications, but we could mark them as expired
  // in a real implementation, or add a system message saying the application expired
  // Here, we'll just return the count for demonstration

  // In a real implementation, you might want to notify applicants that their
  // applications expired due to lack of response

  return { count: expirableApplications.length }
}
