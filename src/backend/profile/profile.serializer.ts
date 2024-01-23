import { ProfileWithRelations } from '@/data/backend/profile/types'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'

export const serializeProfileToProfileModelSimplified = (
  data: ProfileWithRelations,
): ProfileModelSimplified => {
  return {
    id: data.id,
    bio: data.bio,
    city: {
      name: data.city.name,
    },
    openForCityRelocation: data.openForCityRelocation,
    country: {
      name: data.country.name,
    },
    openForCountryRelocation: data.openForCountryRelocation,
    employmentType: data.employmentType,
    fullName: data.fullName,
    state: data.state,
    linkedIn: data.linkedIn,
    position: data.position,
    remoteOnly: data.remoteOnly,
    seniority: data.seniority,
    techStack: data.techStack.map((tech) => tech.techName),
    userId: data.userId,
    avatarUrl: data.user.avatarUrl,
    githubUsername: data.user.githubDetails?.username || null,
    userEmail: data.user.email,
  }
}
