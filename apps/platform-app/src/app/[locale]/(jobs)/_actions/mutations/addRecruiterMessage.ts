'use server'

import {
  addMessageToApplication,
  getApplicationById,
} from '@/backend/application/application.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { AppRoutes } from '@/utils/routes'
import { revalidatePath } from 'next/cache'

/**
 * Server action to add a message to a job application as a recruiter
 * @param applicationId - The ID of the application
 * @param content - The message content
 * @returns The created message and success state
 */
export const addRecruiterMessage = withSentry(
  async (applicationId: string, content: string) => {
    try {
      const { user } = await getAuthorizedUser()

      if (!user) {
        return {
          error: 'Unauthorized',
          success: false,
        }
      }

      // Verify that the user is the job owner for this application
      const application = await getApplicationById(applicationId)
      if (!application || application.jobOwnerId !== user.id) {
        return {
          error:
            'You do not have permission to send messages to this application',
          success: false,
        }
      }

      // User ID is the sender ID
      const senderId = user.id

      // Add the message using the service
      const message = await addMessageToApplication(
        applicationId,
        senderId,
        content,
      )

      // Manually revalidate paths
      revalidatePath(`${AppRoutes.jobs}/${application.jobId}/applications`)

      return {
        message,
        success: true,
      }
    } catch (error) {
      console.error('Error adding recruiter message:', error)
      return {
        error: 'Failed to add message',
        success: false,
      }
    }
  },
)
