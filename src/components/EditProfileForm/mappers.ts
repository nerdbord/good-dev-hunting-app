import { EditProfileFormValues } from '@/components/EditProfileForm/EditProfileFormWrapper'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'

export const mapProfileModelToEditProfileFormValues = (
  profile: ProfileModelSimplified,
): EditProfileFormValues => ({
  fullName: profile.fullName,
  linkedin: profile.linkedIn,
  bio: profile.bio,
  country: profile.country.name,
  openForCountryRelocation: profile.openForCountryRelocation,
  city: profile.city.name,
  openForCityRelocation: profile.openForCityRelocation,
  remoteOnly: profile.remoteOnly,
  position: profile.position,
  seniority: profile.seniority,
  techStack: profile.techStack,
  employment: profile.employmentType,
  githubUsername: profile.githubUsername,
  state: profile.state,
})
