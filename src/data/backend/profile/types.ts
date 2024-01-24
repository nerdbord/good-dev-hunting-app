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
    techStack: true
  }
}>

export interface TechnologyModel {
  id: string
  name: string
}
