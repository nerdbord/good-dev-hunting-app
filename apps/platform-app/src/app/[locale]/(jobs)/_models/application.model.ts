import { type Application } from '@prisma/client'

export interface ApplicationWithRelations extends Application {
  job: {
    id: string
    jobName: string
  }
  applicant: {
    id: string
    email: string
    avatarUrl: string | null
  }
  jobOwner: {
    id: string
    email: string
    avatarUrl: string | null
  }
  messages: {
    id: string
    content: string
    createdAt: Date
    readAt: Date | null
    sender: {
      id: string
      email: string
      avatarUrl: string | null
    }
  }[]
}

export interface ApplicationModel {
  id: string
  jobId: string
  jobName: string
  applicantId: string
  applicantEmail: string
  applicantAvatarUrl: string | null
  jobOwnerId: string
  jobOwnerEmail: string
  jobOwnerAvatarUrl: string | null
  createdAt: Date
  updatedAt: Date | null
  messages: {
    id: string
    content: string
    createdAt: Date
    readAt: Date | null
    senderId: string
    senderEmail: string
    senderAvatarUrl: string | null
  }[]
}

export function createApplicationModel(
  data: ApplicationWithRelations,
): ApplicationModel {
  return {
    id: data.id,
    jobId: data.jobId,
    jobName: data.job.jobName,
    applicantId: data.applicantId,
    applicantEmail: data.applicant.email,
    applicantAvatarUrl: data.applicant.avatarUrl,
    jobOwnerId: data.jobOwnerId,
    jobOwnerEmail: data.jobOwner.email,
    jobOwnerAvatarUrl: data.jobOwner.avatarUrl,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    messages: data.messages.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      readAt: message.readAt,
      senderId: message.sender.id,
      senderEmail: message.sender.email,
      senderAvatarUrl: message.sender.avatarUrl,
    })),
  }
}
