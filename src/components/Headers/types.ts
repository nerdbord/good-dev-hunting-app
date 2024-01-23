import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import { Role } from '@prisma/client'

export type UserProfileHeaderType = {
  userProfile: ProfileModelSimplified
  withBackButton?: boolean
}

export type ModerationActionHeaderType = UserProfileHeaderType & {
  userRoles: Role[]
}
