import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import {
  type Currency,
  type EmploymentType,
  type PublishingState,
} from '@prisma/client'

export type ProfileUpdateParams = Partial<ProfileModel>

export type ProfileCreateParams = {
  fullName: string
  avatarUrl: string | null
  linkedIn: string | null
  bio: string
  country: string
  openForCountryRelocation: boolean
  city: string
  isOpenForWork: boolean
  openForCityRelocation: boolean
  remoteOnly: boolean
  position: JobSpecialization
  seniority: string
  techStack: { name: string }[]
  employmentTypes: EmploymentType[]
  state: PublishingState
  hourlyRateMin: number
  hourlyRateMax: number
  currency: Currency
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
  state: PublishingState
  hourlyRateMin: number
  hourlyRateMax: number
  currency: Currency
}

export interface CreateProfileFormValues extends ProfileFormValues {
  terms: boolean
}

export interface HourlyRateValue {
  hourlyRateMin: number | null
  hourlyRateMax: number | null
}
