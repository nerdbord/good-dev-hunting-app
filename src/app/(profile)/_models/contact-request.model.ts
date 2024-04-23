import { type ContactRequest } from '@prisma/client'

interface ContactRequestRecipient {
  recipientFullName: string
  recipientEmail: string
}

export interface ContactRequestModel extends ContactRequest {
  recipientFullName: string
  recipientEmail: string
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
