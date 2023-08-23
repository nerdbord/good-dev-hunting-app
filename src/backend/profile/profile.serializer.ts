import { ProfileWithRelations } from '@/data/backend/profile/types'
import { ProfileModel } from '@/data/frontend/profile/types'

export const serializeProfileToProfileModel = (
  data: ProfileWithRelations,
): ProfileModel => {
  return {
    id: data.id,
    bio: data.bio,
    city: {
      name: data.city.name,
      openForRelocation: data.city.openForRelocation,
    },
    country: {
      name: data.country.name,
      openForRelocation: data.country.openForRelocation,
    },
    employmentType: data.employmentType,
    fullName: data.fullName,
    isPublished: data.isPublished,
    linkedIn: data.linkedIn,
    position: data.position,
    remoteOnly: data.remoteOnly,
    seniority: data.seniority,
    techStack: data.techStack,
    userId: data.userId,
    avatarUrl: data.user.avatarUrl,
  }
}
