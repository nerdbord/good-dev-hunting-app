import { TechnologyModel } from '@/backend/profile/profile.types'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
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
  isOpenForWork: boolean
  remoteOnly: boolean
  position: string
  seniority: string
  techStack: Omit<TechnologyModel, 'id'>[]
  employmentTypes: EmploymentType[]
  githubUsername: string
  state: PublishingState
  userEmail: string
}

export type ProfilePayload = Omit<
  ProfileModel,
  'id' | 'userEmail' | 'techStack' | 'userId'
> & {
  techStack: TechStack
}

export type TechStack = {
  name: string
}[]

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

export enum AvailabilityEnum {
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME',
  CONTRACT = 'CONTRACT',
}

export interface ProfileFormValues {
  fullName: string
  linkedin: string | null
  bio: string
  country: string
  city: string
  openForCountryRelocation: boolean
  openForCityRelocation: boolean
  remoteOnly: boolean
  position: DropdownOption
  seniority: DropdownOption
  employment: EmploymentType[]
  techStack: DropdownOption[]
  githubUsername: string | null
  state: PublishingState
}
