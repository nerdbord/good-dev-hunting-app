import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'
import { type Personalization } from 'mailersend/lib/modules/Email.module'

export type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  recipientFullName: string
  message: string
  subject: string
}

export const sendContactRequest = async ({
  senderEmail,
  senderFullName,
  subject,
  message,
  recipientEmail,
  recipientFullName,
}: ContactRequestEmailParams) => {
  try {
    const config = {
      fromEmail: senderEmail,
      fromName: senderFullName,
      subject: subject,
    }

    const personalization: Personalization[] = [
      {
        email: recipientEmail,
        data: {
          recipientFullName,
          senderFullName,
          message,
        },
      },
    ]

    const recipients = [new Recipient(recipientEmail)]
    await mailersendClient.sendMail({
      recipients,
      templateId: MailTemplateId.contactRequest,
      config,
      personalization,
    })
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
  }
}

export const sendProfileApprovedEmail = async (
  email: string,
  githubUsername: string,
) => {
  const templateId = MailTemplateId.profileApprovedNotification

  const personalization: Personalization[] = [
    {
      email,
      data: {
        username: githubUsername,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId,
    personalization,
    config: {
      subject: '✅ Your profile has been approved',
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendProfileRejectedEmail = async (
  email: string,
  reason: string,
) => {
  const templateId = MailTemplateId.profileRejectedNotification

  const personalization: Personalization[] = [
    {
      email,
      data: {
        reason: reason,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: templateId,
    personalization,
    config: {
      subject: '⚠️Your profile has been rejected',
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendWelcomeEmail = async (email: string, username: string) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        name: username,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: MailTemplateId.welcomeMail,
    personalization,
    config: {
      subject: `Welcome to the Hunt, ${username}!`,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendMagicLinkEmail = async (email: string, url: string) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        authUrl: url,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: MailTemplateId.verificationRequest,
    personalization,
    config: {
      subject: `Welcome to the Hunt, ${email}!`,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}
