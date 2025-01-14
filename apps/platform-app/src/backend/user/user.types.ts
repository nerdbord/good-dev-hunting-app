import { type Prisma } from '@prisma/client'

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    githubDetails: true
    profile: true
  }
}>

export type UserWithProfileAndGH = Prisma.UserGetPayload<{
  include: {
    githubDetails: true
    profile: true
  }
}>
