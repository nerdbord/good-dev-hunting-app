import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { type Role } from '@prisma/client'

export type UserProfileHeaderType = {
  profile: ProfileModel
  withBackButton?: boolean
  isNerdbordConnected?: boolean
}

export type ModerationActionHeaderType = UserProfileHeaderType & {
  userRoles: Role[]
}
