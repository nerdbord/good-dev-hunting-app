import { City, Country, Profile, User } from '@prisma/client'

export const serializeProfilesToProfilePayload = (
  data: (Profile & {
    user: User
    country: Country
    city: City
  })[],
): ProfilePayload[] => {
  return data.map((profile) => ({
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
  }))
}
