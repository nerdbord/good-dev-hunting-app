import { ContactFormRequest } from '@/components/ContactForm/schema'
import { prisma } from '@/lib/prismaClient'

export async function saveContactRequest(contactRequest: ContactFormRequest) {
  return prisma.contactRequest.create({
    data: {
      subject: contactRequest.subject,
      message: contactRequest.message,
      senderFullName: contactRequest.senderFullName,
      senderEmail: contactRequest.senderEmail,
      profileId: contactRequest.profileId,
    },
  })
}
