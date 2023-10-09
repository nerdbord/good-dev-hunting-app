import { EditProfileFormValues } from '@/components/EditProfileForm/EditProfileFormWrapper'
import { ProfileModel } from '@/data/frontend/profile/types'

export const mapProfileModelToEditProfileFormValues = (
  profile: ProfileModel,
): EditProfileFormValues => ({
  fullName: profile.fullName,
  linkedin: profile.linkedIn,
  bio: profile.bio,
  country: profile.country.name,
  openToRelocationCountry: profile.country.openForRelocation,
  city: profile.city.name,
  openToRelocationCity: profile.city.openForRelocation,
  remoteOnly: profile.remoteOnly,
  position: profile.position,
  seniority: profile.seniority,
  techStack: profile.techStack.join(','),
  employment: profile.employmentType,
  state: profile.state,
})
