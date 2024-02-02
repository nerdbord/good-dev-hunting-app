'use server'
import { MailTemplateId, mailersendClient } from '@/lib/mailersendClient'
import { withSentry } from '@/utils/errHandling'
import { Recipient } from 'mailersend'

export type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  subject: string
}

export const sendContactRequestEmail = withSentry(
  async ({
    senderEmail,
    senderFullName,
    recipientEmail,
    subject,
  }: ContactRequestEmailParams) => {
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
  },
)
