import { EditProfileFormValues } from '@/components/EditProfileForm/EditProfileFormWrapper'
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
  position: profile.position,
  seniority: profile.seniority,
  techStack: profile.techStack.join(','),
  employment: profile.employmentType,
  githubUsername: profile.githubUsername,
  state: profile.state,
})
