import { type TechnologyModel } from '@/backend/profile/profile.types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import {
  type ContactRequest,
  type EmploymentType,
  type ProfileView,
  type PublishingState,
} from '@prisma/client'

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
  profileViews: ProfileView[]
  contactRequests: ContactRequest[]
}

export type ProfilePayload = Omit<
  ProfileModel,
  | 'id'
  | 'userEmail'
  | 'techStack'
  | 'userId'
  | 'profileViews'
  | 'viewCount'
  | 'contactRequests'
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
  UX_Designer = 'UX_Designer',
  UX_Researcher = 'UX_Researcher',
  UX_Writer = 'UX_Writer',
  UI_Designer = 'UI_Designer',
  UX_UI_Designer = 'UX_UI_Designer',
  Product_Designer = 'Product_Designer',
}

export enum JobOfferFiltersEnum {
  technology = 'technology',
  seniority = 'seniority',
  availability = 'availability',
  location = 'location',
  search = 'search',
  specialization = 'specialization',
}

export type SearchParamsFilters = Record<JobOfferFiltersEnum, string[]>

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
