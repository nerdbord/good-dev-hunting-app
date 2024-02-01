import { MailTemplateId, mailersendClient } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  subject: string
}

export const sendContactRequest = async ({
  senderEmail,
  senderFullName,
  subject,
  recipientEmail,
}: ContactRequestEmailParams) => {
  try {
    const config = {
      fromEmail: senderEmail,
      fromName: senderFullName,
      subject: subject,
    }
    const recipients = [new Recipient(recipientEmail)]
    await mailersendClient.sendMail({
      recipients,
      templateId: MailTemplateId.contactRequest,
      config,
    })
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
  }
}
