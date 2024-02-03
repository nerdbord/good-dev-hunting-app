import { ContactFormRequest } from '@/app/(profile)/(components)/ContactForm/schema'
import { prisma } from '@/lib/prismaClient'

export async function createContactRequest(contactRequest: ContactFormRequest) {
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

export async function findExistingContactRequest({
  senderEmail,
  profileId,
}: {
  senderEmail: string
  profileId: string
}) {
  return prisma.contactRequest.findFirst({
    where: {
      senderEmail,
      profileId,
    },
  })
}

export async function deleteContactRequest(id: string) {
  return prisma.contactRequest.delete({
    where: {
      id,
    },
  })
}
