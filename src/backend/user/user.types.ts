import { Prisma } from '@prisma/client'

export interface UserPayload {
  id: string
  profileId: string | null
  githubCredentials: {
    username: string
    email: string
  }
}

export interface CreateUserPayload {
  name: string
  email: string
  image: string
}

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    githubDetails: true
    profile: true
  }
}>
