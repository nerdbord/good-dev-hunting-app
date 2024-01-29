'use server'
import { createContactRequest } from '@/backend/contact-request/contact-request.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'

export const saveContactRequest = async (
  contactFormRequestData: ContactFormRequest,
) => {
  try {
    const createdContactRequest = await createContactRequest(
      contactFormRequestData,
    )
    if (createdContactRequest) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Failed to save contact request:', error)
    return false
  }
}
