import { serializeProfilesToProfilePayload } from './profile.serializer'
import { prisma } from '../../prisma/prismaClient'

export async function getPublishedProfilesPayload() {
  const publishedProfiles = await prisma.profile.findMany({
    where: {
      isPublished: true,
    },
    include: {
      user: true,
      country: true,
      city: true,
    },
  })

  return serializeProfilesToProfilePayload(publishedProfiles)
}
