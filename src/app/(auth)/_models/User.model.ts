import { type UserWithRelations } from '@/backend/user/user.types'
import { type Role } from '@prisma/client'

export type UserModel = {
  id: string
  email: string
  emailVerified: Date | null
  avatarUrl: string | null
  roles: Role[]
  nerdbordUserId: string | null
  githubUsername: string | null
}

export function createUserModel(data: UserWithRelations): UserModel {
  return {
    id: data.id,
    email: data.email,
    emailVerified: data.emailVerified,
    avatarUrl: data.avatarUrl,
    roles: data.roles,
    nerdbordUserId: data.nerdbordUserId,
    githubUsername: data.githubDetails?.username || null,
  }
}
