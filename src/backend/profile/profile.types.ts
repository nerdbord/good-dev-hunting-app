import { Prisma } from '@prisma/client'

export interface ProfilePayload {
  id?: string
  fullName: string
  email?: string | null
  linkedIn: string | null
  userId?: string
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
  employmentType: string
  isPublished: boolean
}

export type CreateProfilePayload = Omit<ProfilePayload, 'id'>

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    user: true
    country: true
    city: true
  }
}>
