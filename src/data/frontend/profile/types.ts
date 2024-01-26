import { TechnologyModel } from '@/data/backend/profile/types'
import { EmploymentType, PublishingState } from '@prisma/client'

export interface ProfileModel {
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
  techStack: TechnologyModel[]
  employmentTypes: EmploymentType[]
  githubUsername: string | null
  state: PublishingState
  userEmail: string
}

export type CreateProfilePayload = Omit<
  ProfileModel,
  'id' | 'userEmail' | 'techStack'
> & {
  techStack: TechStack
}

export type TechStack = {
  techName: string
}[]

export type EditProfilePayload = CreateProfilePayload
export type PublishingStateData = {
  state: PublishingState
}

export type RejectionReason = {
  reason: string
}

export enum JobSpecialization {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Fullstack = 'Fullstack',
}
