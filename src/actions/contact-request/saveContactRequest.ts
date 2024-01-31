'use server'
import {
  createContactRequest,
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
    await createContactRequest(contactFormRequestData)
    return true
  } catch (error) {
    console.error('Failed to save contact request:', error)
    return
  }
}
