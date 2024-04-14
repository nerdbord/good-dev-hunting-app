import { sendContactRequest } from '@/backend/mailing/mailing.service'
import { type ContactRequest } from '@prisma/client'

interface ContactRequestRecipient {
  recipientFullName: string
  recipientEmail: string
}

export class ContactRequestModel implements ContactRequest {
  id: string
  subject: string
  message: string
  senderFullName: string
  senderEmail: string
  profileId: string
  recipientEmail: string
  recipientFullName: string
  createdAt: Date

  constructor(data: ContactRequest & ContactRequestRecipient) {
    this.id = data.id
    this.subject = data.subject
    this.message = data.message
    this.recipientFullName = data.recipientFullName
    this.recipientEmail = data.recipientEmail
    this.senderFullName = data.senderFullName
    this.senderEmail = data.senderEmail
    this.profileId = data.profileId
    this.createdAt = new Date()
  }

  async send() {
    return await sendContactRequest({
      subject: this.subject,
      message: this.message,
      senderFullName: this.senderFullName,
      senderEmail: this.senderEmail,
      recipientEmail: this.recipientEmail,
      recipientFullName: this.recipientFullName,
    })
  }
}
