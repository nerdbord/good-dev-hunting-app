import { ProfileModel } from '@/app/(profile)/types'
import { ProfileWithRelations } from '@/backend/profile/profile.types'

export const serializeProfileToProfileModel = (
  data: ProfileWithRelations,
): ProfileModel => {
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
    employmentTypes: data.employmentTypes,
    fullName: data.fullName,
    state: data.state,
    linkedIn: data.linkedIn,
    position: data.position,
    remoteOnly: data.remoteOnly,
    seniority: data.seniority,
    techStack: data.techStack.map((tech) => ({
      id: tech.id,
      name: tech.name,
    })),
    userId: data.userId,
    avatarUrl: data.user.avatarUrl,
    githubUsername: data.user.githubDetails?.username || null,
    userEmail: data.user.email,
  }
}
