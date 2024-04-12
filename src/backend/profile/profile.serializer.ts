import {
  type JobSpecialization,
  type ProfileModel,
} from '@/app/(profile)/types'
import { type ProfileWithRelations } from '@/backend/profile/profile.types'

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
    isOpenForWork: data.isOpenForWork,
    state: data.state,
    linkedIn: data.linkedIn,
    position: data.position as JobSpecialization,
    remoteOnly: data.remoteOnly,
    seniority: data.seniority,
    techStack: data.techStack.map((tech) => ({
      id: tech.id,
      name: tech.name,
    })),
    userId: data.userId,
    avatarUrl: data.user.avatarUrl,
    githubUsername: data.user.githubDetails?.username || '',
    userEmail: data.user.email,
    viewCount: data.viewCount,
    profileViews: data.profileViews,
    contactRequests: data.contactRequests,
  }
}
