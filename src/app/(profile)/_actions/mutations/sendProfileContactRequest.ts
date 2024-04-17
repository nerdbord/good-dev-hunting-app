'use server'
import { type ContactFormRequest } from '@/app/(profile)/(components)/ContactForm/schema'
import { createContactRequestModel } from '@/app/(profile)/_models/contact-request.model'
import {
  createContactRequest,
  deleteContactRequest,
  findExistingContactRequest,
} from '@/backend/contact-request/contact-request.service'
import { sendContactRequest } from '@/backend/mailing/mailing.service'
import { getProfileById } from '@/backend/profile/profile.service'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { withSentry } from '@/utils/errHandling'
import { type ContactRequest } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'

export const sendProfileContactRequest = withSentry(
  async ({
    message,
    senderEmail,
    senderFullName,
    subject,
    profileId,
  }: ContactFormRequest) => {
    let contactRequest: ContactRequest | null = null
    try {
      const foundProfile = await getProfileById(profileId)

      if (!foundProfile) {
        throw Error('Profile not found')
      }

      if (!foundProfile.isOpenForWork) {
        throw Error('This dev is not open for work')
      }

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

      await sendContactRequest({
        senderEmail,
        senderFullName,
        subject,
        message,
        recipientEmail: foundProfile.user.email,
        recipientFullName: foundProfile.fullName,
      })

      await mailerliteClient.addSubscriberToMailerLite(
        senderEmail,
        mailerliteGroups.contactGroup,
      )

      return createContactRequestModel({
        ...createdContactRequest,
        recipientEmail: foundProfile.user.email,
        recipientFullName: foundProfile.fullName,
      })
    } catch (error) {
      Sentry.captureException(error)
      contactRequest && (await deleteContactRequest(contactRequest.id))
      throw error
    }
  },
)
