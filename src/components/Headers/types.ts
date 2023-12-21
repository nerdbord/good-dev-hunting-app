import { ProfileModel } from '@/data/frontend/profile/types'
import { Role } from '@prisma/client'

export type UserProfileHeaderType = {
  userProfile: ProfileModel
  withBackButton?: boolean
}

export type ModerationActionHeaderType = UserProfileHeaderType & {
  userRoles: Role[]
}
