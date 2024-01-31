'use server'
import {
  createContactRequest,
  deleteContactRequest,
  findExistingContactRequest,
} from '@/backend/contact-request/contact-request.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'

export const saveContactRequest = async (
  contactFormRequestData: ContactFormRequest,
) => {
  try {
    const existingContactRequest = await findExistingContactRequest({
      senderEmail: contactFormRequestData.senderEmail,
      profileId: contactFormRequestData.profileId,
    })
    if (existingContactRequest) {
      throw Error('You already contacted this dev')
    }
    const createdContactRequest = await createContactRequest(
      contactFormRequestData,
    )
    if (createdContactRequest) {
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
