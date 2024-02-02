'use server'
import {
  createContactRequest,
  deleteContactRequest,
  findExistingContactRequest,
} from '@/backend/contact-request/contact-request.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { withSentry } from '@/utils/errHandling'
import { ContactRequest } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import {
  ContactRequestEmailParams,
  sendContactRequestEmail,
} from '../mailing/sendContactRequestEmail'

export const saveContactRequest = withSentry(
  async ({
    message,
    senderEmail,
    senderFullName,
    recipientEmail,
    subject,
    profileId,
  }: ContactFormRequest & ContactRequestEmailParams) => {
    let contactRequest: ContactRequest | null = null
    try {
      const existingContactRequest = await findExistingContactRequest({
        senderEmail: senderEmail,
        profileId: profileId,
      })

      if (existingContactRequest) {
        throw Error('You already contacted this dev')
      }

      const createdContactRequest = await createContactRequest({
        senderEmail,
        senderFullName,
        subject,
        profileId,
        message,
      })

      contactRequest = createdContactRequest

      if (!createdContactRequest) {
        throw Error('Failed to save contact request')
      }

      await sendContactRequestEmail({
        senderEmail,
        senderFullName,
        recipientEmail,
        subject,
      })

      await mailerliteClient.addSubscriberToMailerLite(
        senderEmail,
        mailerliteGroups.contactGroup,
      )

      return createdContactRequest
    } catch (error) {
      Sentry.captureException(error)
      contactRequest && (await deleteContactRequest(contactRequest.id))
      throw error
    }
  },
)
