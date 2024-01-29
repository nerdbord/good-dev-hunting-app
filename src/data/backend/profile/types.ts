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

export enum SeniorityLevel {
  INTERN = 'INTERN',
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
  LEAD_EXPERT = 'LEAD_EXPERT',
}
