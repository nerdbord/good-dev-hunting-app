'use server'
import { type ContactFormRequest } from '@/app/[locale]/(profile)/(components)/ContactForm/schema'
import { createContactRequestModel } from '@/app/[locale]/(profile)/_models/contact-request.model'
import {
  createContactRequest,
  deleteContactRequest,
  findExistingContactRequest,
} from '@/backend/contact-request/contact-request.service'
import { sendContactRequest } from '@/backend/mailing/mailing.service'
import { getProfileById } from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { getAuthorizedUser } from '@/utils/auth.helpers'
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
    const { user: authorizedUser } = await getAuthorizedUser()

    if (!authorizedUser) {
      return {
        error: 'Unauthorized',
      }
    }

    const senderId = authorizedUser.id
    let contactRequest: ContactRequest | null = null

    try {
      const foundProfile = await getProfileById(profileId)

      if (!foundProfile) {
        return {
          error: 'Profile not found',
        }
      }

      if (!foundProfile.isOpenForWork) {
        return {
          error: 'Profile is not open for work',
        }
      }

      const existingContactRequest = await findExistingContactRequest({
        senderEmail: senderEmail,
        profileId: profileId,
      })

      if (existingContactRequest) {
        return {
          error: 'You have already sent a contact request to this profile',
        }
      }

      const createdContactRequest = await createContactRequest(
        {
          senderEmail,
          senderFullName,
          subject,
          profileId,
          message,
        },
        senderId,
      )

      contactRequest = createdContactRequest

      if (!createdContactRequest) {
        return {
          error: 'Could not create contact request',
        }
      }

      await sendContactRequest(
        {
          senderEmail,
          senderFullName,
          subject,
          message,
          recipientEmail: foundProfile.user.email,
          recipientFullName: foundProfile.fullName,
        },
        foundProfile.user.preferredLanguage,
      )

      await sendDiscordNotificationToModeratorChannel(
        `💌 User ${senderEmail} / name: ${senderFullName} send message: '${message}' to: ${foundProfile.user.email} / name: ${foundProfile.fullName}.`,
      )

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
