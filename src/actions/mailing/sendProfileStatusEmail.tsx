'use server'

import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { PublishingState } from '@prisma/client'
import { Recipient } from 'mailersend'

export const sendProfileStatusEmail = async (
  email: string,
  status: keyof typeof PublishingState,
) => {
  function setTemplateByStatus(status: keyof typeof PublishingState) {
    switch (status) {
      case PublishingState.APPROVED:
        return MailTemplateId.profileApprovedNotification
      case PublishingState.REJECTED:
        return MailTemplateId.profileRejectedNotification
      default:
    }
  }
  const templateId = setTemplateByStatus(status)

  // Pending/draft status doesn't get notification.
  if (!templateId) {
    return
  }

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
