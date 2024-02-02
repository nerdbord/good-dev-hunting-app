'use server'

import {
  ContactRequestEmailParams,
  sendContactRequest,
} from '@/backend/mailing/mailing.service'
import { withSentry } from '@/utils/errHandling'
export const contactRequestEmail = withSentry(
  async ({
    senderEmail,
    senderFullName,
    subject,
    recipientEmail,
  }: ContactRequestEmailParams) => {
    return await sendContactRequest({
      senderEmail,
      senderFullName,
      subject,
      recipientEmail,
    })
  },
)
