import { prisma } from '../prisma/prismaClient'

export const allPublishedProfiles = async (): Promise<ProfilePayload[]> => {
  prisma

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

  const serializedProfiles: ProfilePayload[] = publishedProfiles.map(
    (profile) => {
      return {
        id: profile.id,
        fullName: profile.fullName,
        email: profile.user.email,
        linkedIn: profile.linkedIn,
        userId: profile.userId,
        bio: profile.bio,
        country: {
          name: profile.country.name,
          openForRelocation: profile.country.openForRelocation,
        },
        city: {
          name: profile.city.name,
          openForRelocation: profile.city.openForRelocation,
        },
        remoteOnly: profile.remoteOnly,
        position: profile.position,
        seniority: profile.seniority,
        techStack: profile.techStack,
        employmentType: profile.employmentType,
        isPublished: profile.isPublished,
      }
    },
  )

  return serializedProfiles
}
