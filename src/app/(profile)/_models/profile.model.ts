import {
  type JobSpecialization,
  type TechStack,
} from '@/app/(profile)/profile.types'
import { type ProfileWithRelations } from '@/backend/profile/profile.types'
import { type Profile, type PublishingState } from '@prisma/client'

export interface ProfileModel extends Profile {
  position: JobSpecialization
  state: PublishingState
  avatarUrl: string | null
  techStack: TechStack
  githubUsername: string | null
  city: string
  country: string
  email: string
}

export function createProfileModel(data: ProfileWithRelations): ProfileModel {
  return {
    id: data.id,
    userId: data.userId,
    fullName: data.fullName,
    linkedIn: data.linkedIn,
    bio: data.bio,
    countryId: data.countryId,
    openForCountryRelocation: data.openForCountryRelocation,
    cityId: data.cityId,
    openForCityRelocation: data.openForCityRelocation,
    remoteOnly: data.remoteOnly,
    position: data.position as JobSpecialization,
    seniority: data.seniority,
    isOpenForWork: data.isOpenForWork,
    employmentTypes: data.employmentTypes,
    state: data.state,
    viewCount: data.viewCount,
    avatarUrl: data.user?.avatarUrl || null,
    techStack: data.techStack,
    githubUsername: data.user?.githubDetails?.username || null,
    country: data.country.name,
    city: data.city.name,
    email: data.user.email,
  }
}
