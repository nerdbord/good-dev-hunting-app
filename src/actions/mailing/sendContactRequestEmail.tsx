'use server'
import { MailTemplateId, mailersendClient } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

export type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  subject: string
}

export const sendContactRequestEmail = async ({
  senderEmail,
  senderFullName,
  recipientEmail,
  subject,
}: ContactRequestEmailParams) => {
  try {
    const config = {
      fromEmail: senderEmail,
      fromName: senderFullName,
      subject: subject,
    }
    const recipients = [new Recipient(recipientEmail)]
    return await mailersendClient.sendMail({
      recipients,
      templateId: MailTemplateId.contactRequest,
      config,
    })
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
    throw Error('Error occured whilst sending contact request.')
  }
}
