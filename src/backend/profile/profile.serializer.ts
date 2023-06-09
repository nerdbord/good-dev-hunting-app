import { ProfileWithRelations } from './profile.types'

export const serializeProfilesToProfilePayload = (
  data: ProfileWithRelations,
) => {
  return {
    id: data.id,
    fullName: data.fullName,
    email: data.user.email,
    linkedIn: data.linkedIn,
    userId: data.userId,
    bio: data.bio,
    country: {
      name: data.country.name,
      openForRelocation: data.country.openForRelocation,
    },
    city: {
      name: data.city.name,
      openForRelocation: data.city.openForRelocation,
    },
    remoteOnly: data.remoteOnly,
    position: data.position,
    seniority: data.seniority,
    techStack: data.techStack,
    employmentType: data.employmentType,
    isPublished: data.isPublished,
  }
}
