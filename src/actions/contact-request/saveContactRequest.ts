'use server'
import {
  createContactRequest,
  findRedundantContactRequest,
} from '@/backend/contact-request/contact-request.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'

export const saveContactRequest = async (
  contactFormRequestData: ContactFormRequest,
) => {
  try {
    const redundantContactRequest = await findRedundantContactRequest({
      senderEmail: contactFormRequestData.senderEmail,
      profileId: contactFormRequestData.profileId,
    })
    if (!redundantContactRequest) {
      const createdContactRequest = await createContactRequest(
        contactFormRequestData,
      )
      if (createdContactRequest) {
        return createdContactRequest
      }
    }
    console.log('User has already contacted this profile')
    return false
  } catch (error) {
    console.error('Failed to save contact request:', error)
    return false
  }
}
