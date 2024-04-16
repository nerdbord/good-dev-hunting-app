import { type ContactRequest } from '@prisma/client'

interface ContactRequestRecipient {
  recipientFullName: string
  recipientEmail: string
}

type ContactRequestModel = {
  id: string
  subject: string
  message: string
  senderFullName: string
  senderEmail: string
  profileId: string
  recipientEmail: string
  recipientFullName: string
  createdAt: Date
}

export function createContactRequestModel(
  data: ContactRequest & ContactRequestRecipient,
): ContactRequestModel {
  return {
    id: data.id,
    subject: data.subject,
    message: data.message,
    senderFullName: data.senderFullName,
    senderEmail: data.senderEmail,
    profileId: data.profileId,
    recipientEmail: data.recipientEmail,
    recipientFullName: data.recipientFullName,
    createdAt: new Date(),
  }
}
