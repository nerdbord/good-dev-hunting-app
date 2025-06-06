'use server'

import { createApplication } from '@/backend/application/application.service'
import { notifyJobApplication } from '@/lib/discord'
import { prisma } from '@/lib/prismaClient'
import { getAuthorizedUser } from '@/utils/auth.helpers'

export interface JobApplicationData {
  jobId: string
  message: string
  cvUrl: string
}

export async function createJobApplication(data: JobApplicationData) {
  try {
    const { user } = await getAuthorizedUser()

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      }
    }

    if (!user.profileId) {
      return {
        success: false,
        error: 'User profile not found',
      }
    }

    // Get job details to find job owner
    const job = await prisma.job.findUnique({
      where: { id: data.jobId },
      select: { createdById: true },
    })

    if (!job) {
      return {
        success: false,
        error: 'Job not found',
      }
    }

    if (!job.createdById) {
      return {
        success: false,
        error: 'Job owner not found',
      }
    }

    // Create the application using the application service
    const application = await createApplication({
      jobId: data.jobId,
      applicantId: user.id,
      jobOwnerId: job.createdById,
      initialMessage: data.message,
      cvUrl: data.cvUrl,
    })

    // Get additional details for the notification
    const jobDetails = await prisma.job.findUnique({
      where: { id: data.jobId },
      select: { jobName: true },
    })

    const applicantProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
      select: { fullName: true },
    })

    // Send Discord notification for the new job application
    await notifyJobApplication({
      id: application.id,
      jobId: data.jobId,
      jobName: jobDetails?.jobName,
      applicantId: user.id,
      applicantName: applicantProfile?.fullName,
      jobOwnerId: job.createdById,
    })

    return {
      success: true,
      applicationId: application.id,
    }
  } catch (error) {
    console.error('Error creating job application:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create job application',
    }
  }
}
