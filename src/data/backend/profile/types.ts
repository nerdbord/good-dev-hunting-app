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

// Not sure if those are/will be needed
export interface ProfileModel
  extends Omit<ProfileModelSimplified, 'techStack'> {
  techStack: TechnologyOnProfileModel[]
}

// not sure if those commented properties are neccessary, if included they create little refference loop with Profile, maybe distuingish them in separate standalone techModel interface and techModelRefference?
export interface TechnologyModel {
  id: string
  name: string
  // profiles: TechnologyOnProfileModel[]
}

export interface TechnologyOnProfileModel {
  techName: string
  profileId: string
  technology: TechnologyModel
  // profile: ProfileModel
}
