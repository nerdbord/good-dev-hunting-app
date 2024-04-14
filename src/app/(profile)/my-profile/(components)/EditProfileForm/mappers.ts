import { mapSeniorityLevel } from '@/app/(profile)/profile.mappers'

import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { type ProfileFormValues } from '@/app/(profile)/profile.types'
import { type SeniorityLevel } from '@/backend/profile/profile.types'

export const mapProfileModelToEditProfileFormValues = (
  profile: ProfileModel,
): ProfileFormValues => ({
  fullName: profile.fullName,
  linkedin: profile.linkedIn,
  bio: profile.bio,
  country: profile.country,
  openForCountryRelocation: profile.openForCountryRelocation,
  city: profile.city,
  openForCityRelocation: profile.openForCityRelocation,
  remoteOnly: profile.remoteOnly,
  position: {
    name: profile.position,
    value: profile.position,
  },
  seniority: {
    name: mapSeniorityLevel(profile.seniority as SeniorityLevel),
    value: profile.seniority,
  },
  techStack: profile.techStack.map((tech) => ({
    name: tech.name,
    value: tech.name,
  })),
  employment: profile.employmentTypes,
  githubUsername: profile.githubUsername,
  state: profile.state,
  viewCount: profile.viewCount,
})
