import { ProfileModel } from '@/app/(profile)/types'
import { Role } from '@prisma/client'

export type UserProfileHeaderType = {
  userProfile: ProfileModel
  withBackButton?: boolean
  isNerdbordConnected?: boolean
}

export type ModerationActionHeaderType = UserProfileHeaderType & {
  userRoles: Role[]
}
