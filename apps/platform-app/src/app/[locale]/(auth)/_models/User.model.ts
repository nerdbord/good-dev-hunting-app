import { type UserWithRelations } from '@/backend/user/user.types'
import { type Profile, type User } from '@prisma/client'

export interface UserModel extends User {
  githubUsername: string | null
  profileId: Profile['id'] | null
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
    createdAt: data.createdAt,
    profileId: data.profile?.id || null,
  }
}
