'use server'
import {
  createContactRequest,
  deleteContactRequest,
  findExistingContactRequest,
} from '@/backend/contact-request/contact-request.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import {
  ContactRequestEmailParams,
  sendContactRequestEmail,
} from '../mailing/sendContactRequestEmail'

export const saveContactRequest = async ({
  message,
  senderEmail,
  senderFullName,
  recipientEmail,
  subject,
  profileId,
}: ContactFormRequest & ContactRequestEmailParams) => {
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
    if (createdContactRequest) {
      try {
        await sendContactRequestEmail({
          senderEmail: senderEmail,
          senderFullName: senderFullName,
          recipientEmail: recipientEmail,
          subject: subject,
        })
        await mailerliteClient.addSubscriberToMailerLite(
          senderEmail,
          mailerliteGroups.contactGroup,
        )
      } catch (error) {
        await deleteSavedContactRequest(senderEmail, profileId)
        throw Error('Failed to send contact request')
      }

      return createdContactRequest
    } else {
      throw Error('Failed to save contact request.')
    }
  } catch (error) {
    console.error('Failed to save contact request:', error)
    throw Error('Failed to save contact request.')
  }
}

export const deleteSavedContactRequest = async (
  senderEmail: string,
  profileId: string,
) => {
  try {
    await deleteContactRequest({ senderEmail, profileId })
  } catch (error) {
    console.error('Failed to delete contact request:', error)
  }
}
