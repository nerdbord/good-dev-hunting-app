import { type ProfileModel } from '@/app/(profile)/types'
import { type Role } from '@prisma/client'

export type UserProfileHeaderType = {
  userProfile: ProfileModel
  withBackButton?: boolean
  isNerdbordConnected?: boolean
}

export type ModerationActionHeaderType = UserProfileHeaderType & {
  userRoles: Role[]
}
