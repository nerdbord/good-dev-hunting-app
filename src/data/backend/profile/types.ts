import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import { Prisma } from '@prisma/client'

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    user: {
      include: {
        githubDetails: true
      }
    }
    country: true
    city: true
    techStack: {
      include: {
        technology: true
      }
    }
  }
}>

export interface ProfileModel
  extends Omit<ProfileModelSimplified, 'techStack'> {
  techStack: TechnologyOnProfileModel[]
}

export interface TechnologyModel {
  id: string
  name: string
}

export interface TechnologyOnProfileModel {
  techName: string
  profileId: string
}
