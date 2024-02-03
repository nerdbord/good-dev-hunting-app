import { mapSeniorityLevel } from '@/app/(profile)/mappers'
import { EditProfileFormValues } from '@/app/(profile)/my-profile/(components)/EditProfileForm/EditProfileForm'
import { ProfileModel } from '@/app/(profile)/types'
import { SeniorityLevel } from '@/backend/profile/profile.types'

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
