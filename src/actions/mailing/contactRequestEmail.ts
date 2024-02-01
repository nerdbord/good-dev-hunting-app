'use server'

import {
  ContactRequestEmailParams,
  sendContactRequest,
} from '@/backend/mailing/mailing.service'

export async function contactRequestEmail({
  senderEmail,
  senderFullName,
  subject,
  recipientEmail,
}: ContactRequestEmailParams) {
  return await sendContactRequest({
    senderEmail,
    senderFullName,
    subject,
    recipientEmail,
  })
}
