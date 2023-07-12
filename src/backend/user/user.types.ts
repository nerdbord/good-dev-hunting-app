import { Prisma } from '@prisma/client'

export interface UserPayload {
  id: string
  profileId: string | null
  githubCredentials: {
    username: string
    email: string
  }
}

export type CreateUserPayload = Omit<UserPayload, 'id'>

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    githubDetails: true
    profile: true
  }
}>
