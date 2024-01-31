'use server'
import { MailTemplateId, mailersendClient } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  subject: string
}

export const sendContactRequestEmail = async (
  cREParams: ContactRequestEmailParams,
) => {
  try {
    const config = {
      fromEmail: cREParams.senderEmail,
      fromName: cREParams.senderFullName,
      subject: cREParams.subject,
    }
    const recipients = [new Recipient(cREParams.recipientEmail)]
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
