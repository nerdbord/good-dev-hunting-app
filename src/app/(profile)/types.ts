import { type TechnologyModel } from '@/backend/profile/profile.types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import { type EmploymentType, type PublishingState } from '@prisma/client'

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
  position: JobSpecialization
  seniority: string
  techStack: Omit<TechnologyModel, 'id'>[]
  employmentTypes: EmploymentType[]
  githubUsername: string
  state: PublishingState
  userEmail: string
  viewCount: number
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

export enum JobSpecialization {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Fullstack = 'Fullstack',
  Mobile = 'Mobile',
  DevOps = 'DevOps',
  QA = 'QA',
  PM = 'PM',
  DataScience = 'DataScience',
  GameDev = 'GameDev',
  VR_AR = 'VR_AR',
  UX_UI = 'UX_UI',
  Crypto = 'Crypto',
  CyberSecurity = 'CyberSecurity',
  SysAdmin = 'SysAdmin',
}

export enum JobOfferFiltersEnum {
  technology = 'technology',
  seniority = 'seniority',
  availability = 'availability',
  location = 'location',
  search = 'search',
}

export interface ProfileFormValues {
  viewCount: number
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

export interface CreateProfileFormValues extends ProfileFormValues {
  terms: boolean
}
