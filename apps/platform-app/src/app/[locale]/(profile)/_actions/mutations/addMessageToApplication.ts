'use server'

import { addMessageToApplication as addMessageService } from '@/backend/application/application.service'
import { prisma } from '@/lib/prismaClient'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { decryptMessage } from '@/utils/messageEncryption'
import { AppRoutes } from '@/utils/routes'
import { revalidatePath } from 'next/cache'

/**
 * Server action to add a message to a job application
 * @param applicationId - The ID of the application
 * @param content - The message content
 * @returns The created message object
 */
export const addMessageToApplication = withSentry(
  async (applicationId: string, content: string) => {
    try {
      const { user } = await getAuthorizedUser()

      if (!user) {
        return {
          error: 'Unauthorized',
          success: false,
        }
      }

      const job = await prisma.job.findFirst({
        where: {
          applications: {
            some: {
              id: applicationId,
            },
          },
        },
      })

      // User ID is the sender ID
      const senderId = user.id
      const isJobOwner = job?.createdById === user.id

      // Add the message using the service
      const message = await addMessageService(applicationId, senderId, content)

      // Manually revalidate the inbox path to ensure fresh data
      revalidatePath(AppRoutes.inbox)

      // Notify connected clients of the new message
      if (global.messageListeners?.has(applicationId)) {
        const messageData = {
          id: message.id,
          applicationId,
          senderId,
          content: decryptMessage(message.content), // Decrypt for sending to client
          timestamp: message.sentAt.toISOString(),
          sender: isJobOwner ? 'jobOwner' : 'applicant',
        }

        // Notify all listeners for this application
        const listeners = global.messageListeners.get(applicationId)
        if (listeners) {
          listeners.forEach((listener) => {
            listener(messageData)
          })
        }
      }

      return {
        message,
        success: true,
      }
    } catch (error) {
      console.error('Error adding message to application:', error)
      return {
        error: 'Failed to add message',
        success: false,
      }
    }
  },
)
