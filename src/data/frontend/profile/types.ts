import { EmploymentType, PublishingState } from '@prisma/client'

export interface ProfileModelSimplified {
  id: string
  fullName: string
  avatarUrl: string | null
  linkedIn: string | null
  userId: string
  bio: string
  country: {
    name: string
  }
  openForCountryRelocation: boolean
  city: {
    name: string
  }
  openForCityRelocation: boolean
  remoteOnly: boolean
  position: string
  seniority: string
  techStack: string[]
  employmentType: EmploymentType
  githubUsername: string | null
  state: PublishingState
  userEmail: string
}

export type CreateProfilePayload = Omit<
  ProfileModelSimplified,
  'id' | 'userEmail' | 'techStack'
> & {
  techStack: { techName: string }[]
}
export type EditProfilePayload = CreateProfilePayload
export type PublishingStateData = {
  state: PublishingState
}

export type RejectionReason = {
  reason: string
}
