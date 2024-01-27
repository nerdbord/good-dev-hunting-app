import { EditProfileFormValues } from '@/components/EditProfileForm/EditProfileFormWrapper'
import { SeniorityLevel } from '@/data/backend/profile/types'
import { mapSeniorityLevel } from '@/data/frontend/profile/mappers'
import { ProfileModel } from '@/data/frontend/profile/types'

export const mapProfileModelToEditProfileFormValues = (
  profile: ProfileModel,
): EditProfileFormValues => ({
  fullName: profile.fullName,
  linkedin: profile.linkedIn,
  bio: profile.bio,
  country: profile.country.name,
  openForCountryRelocation: profile.openForCountryRelocation,
  city: profile.city.name,
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
})
