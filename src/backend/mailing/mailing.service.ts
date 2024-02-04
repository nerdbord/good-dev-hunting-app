import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

export type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  message: string
  subject: string
}

export const sendContactRequest = async ({
  senderEmail,
  senderFullName,
  subject,
  message,
  recipientEmail,
}: ContactRequestEmailParams) => {
  try {
    const config = {
      fromEmail: senderEmail,
      fromName: senderFullName,
      subject: subject,
    }

    const variables = [
      {
        email: recipientEmail,
        substitutions: [
          {
            var: 'message',
            value: message,
          },
        ],
      },
    ]

    const recipients = [new Recipient(recipientEmail)]
    await mailersendClient.sendMail({
      recipients,
      templateId: MailTemplateId.contactRequest,
      config,
      variables,
    })
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
  }
}

export const sendProfileApprovedEmail = async (email: string) => {
  const templateId = MailTemplateId.profileApprovedNotification

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: templateId,
    config: {
      subject: '✅Your profile has been approved',
      fromEmail: 'team@devhunting.co',
      fromName: 'Good DevHunting Team',
    },
  })
}

export const sendProfileRejectedEmail = async (
  email: string,
  reason: string,
) => {
  const templateId = MailTemplateId.profileRejectedNotification

  const variables = [
    {
      email,
      substitutions: [
        {
          var: 'reason',
          value: reason,
        },
      ],
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: templateId,
    variables,
    config: {
      subject: '⚠️Your profile has been rejected',
      fromEmail: 'team@devhunting.co',
      fromName: 'Good DevHunting Team',
    },
  })
}

export const sendWelcomeEmail = async (email: string, username: string) => {
  const variables = [
    {
      email,
      substitutions: [
        {
          var: 'name',
          value: username,
        },
      ],
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: MailTemplateId.welcomeMail,
    variables,
    config: {
      subject: `Welcome to the Hunt, ${username}!`,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good DevHunting Team',
    },
  })
}
