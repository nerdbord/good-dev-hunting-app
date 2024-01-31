'use server'

import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'

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
