import { prisma } from '@/lib/prismaClient'
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
        content: cvUrl ? `${initialMessage}\n\nCV: ${cvUrl}` : initialMessage,
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

  // Create new application with initial message
  const application = await prisma.application.create({
    data: {
      jobId,
      applicantId,
      jobOwnerId,
      messages: {
        create: {
          content: cvUrl ? `${initialMessage}\n\nCV: ${cvUrl}` : initialMessage,
          senderId: applicantId,
        },
      },
    },
    include: {
      messages: true,
    },
  })

  revalidatePath(AppRoutes.inbox)

  return application
}

/**
 * Gets all applications for a user (either as applicant or job owner)
 */
export async function getUserApplications(
  userId: string,
): Promise<ApplicationWithMessages[]> {
  return prisma.application.findMany({
    where: {
      OR: [{ applicantId: userId }, { jobOwnerId: userId }],
    },
    include: {
      job: true,
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
              position: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

/**
 * Gets a specific application by ID
 */
export async function getApplicationById(
  id: string,
): Promise<ApplicationWithMessages | null> {
  return prisma.application.findUnique({
    where: { id },
    include: {
      job: true,
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
              position: true,
            },
          },
        },
      },
    },
  })
}

/**
 * Adds a new message to an existing application
 */
export async function addMessageToApplication(
  applicationId: string,
  senderId: string,
  content: string,
): Promise<Message> {
  const message = await prisma.message.create({
    data: {
      content,
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
