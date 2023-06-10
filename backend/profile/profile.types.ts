import { City, Country, Profile, User } from '@prisma/client'

export interface ProfilePayload {
  id: string
  fullName: string
  email: string
  linkedIn: string
  userId: string
  bio: string
  country: {
    name: string
    openForRelocation: boolean
  }
  city: {
    name: string
    openForRelocation: boolean
  }
  remoteOnly: boolean
  position: string
  seniority: string
  techStack: string[]
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT'
  isPublished: boolean
}

export type CreateProfilePayload = Omit<ProfilePayload, 'id'>

export type ProfileDataFromPrisma =
  | (Profile & {
      user: User
      country: Country
      city: City
    })
  | null
