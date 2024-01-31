'use server'
import { MailTemplateId, mailersendClient } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  subject: string
}

export const sendContactRequest = async (
  cREParams: ContactRequestEmailParams,
) => {
  try {
    const sender = {
      email: cREParams.senderEmail,
      name: cREParams.senderFullName,
    }
    const recipients = [new Recipient(cREParams.recipientEmail)]
    await mailersendClient.sendMail(
      recipients,
      MailTemplateId.contactRequest,
      cREParams.subject,
      sender,
    )
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
  }
}
