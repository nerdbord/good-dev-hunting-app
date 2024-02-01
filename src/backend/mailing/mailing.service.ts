import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

export const sendProfileApprovedEmail = async (email: string) => {
  const templateId = MailTemplateId.profileApprovedNotification

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: templateId,
    config: {
      subject: 'Good DevHunting profile status notification.',
      fromEmail: 'team@devhunting.co',
      fromName: 'DevHunting Team',
    },
  })
}

export const sendProfileRejectedEmail = async (
  email: string,
  reason: string,
) => {
  const templateId = MailTemplateId.profileRejectedNotification

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: templateId,
    config: {
      subject: 'Good DevHunting profile status notification.',
      fromEmail: 'team@devhunting.co',
      fromName: 'DevHunting Team',
    },
  })
}

export const sendWelcomeEmail = async (email: string) => {
  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: MailTemplateId.welcomeMail,
    config: {
      subject: 'Welcome to Good DevHunting!',
      fromEmail: 'team@devhunting.co',
      fromName: 'DevHunting Team',
    },
  })
}
