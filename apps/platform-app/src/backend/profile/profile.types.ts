import { type Prisma } from '@prisma/client'

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    user: {
      include: {
        githubDetails: true
        linkedinDetails: true
      }
    }
    country: true
    city: true
    techStack: true
    profileViews: true
    contactRequests: true
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
