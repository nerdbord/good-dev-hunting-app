import { mapSeniorityLevel } from '@/app/[locale]/(profile)/profile.mappers'

import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { type ProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import { type SeniorityLevel } from '@/backend/profile/profile.types'

export const mapLanguagesToProfileModel = (
  languages: { name: string; value: string }[],
): { name: string }[] => {
  return languages.map((language) => ({ name: language.value }))
}

export const mapLanguagesToProfileFormValues = (
  languages: { name: string }[],
): { name: string; value: string }[] => {
  return languages.map((language) => ({
    name: language.name,
    value: language.name,
  }))
}

export const mapProfileModelToEditProfileFormValues = (
  profile: ProfileModel,
): ProfileFormValues => ({
  slug: profile.slug,
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
  state: profile.state,
  hourlyRateMin: profile.hourlyRateMin ?? 0,
  hourlyRateMax: profile.hourlyRateMax ?? 0,
  currency: profile.currency,
  language: mapLanguagesToProfileFormValues(profile.language),
})
