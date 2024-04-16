import { auth } from '@/auth'
import { Role, type User } from '@prisma/client'

export const authorizeUser = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    throw Error('Unauthorized')
  }

  return { email: session.user.email }
}

export const getAuthorizedUser = async () => {
  const session = await auth()
  if (!session || !session.user) {
    return { user: null, userIsHunter: false, userIsModerator: false }
  }

  const userIsHunter = session.user.roles.includes(Role.HUNTER)
  const userIsModerator = session.user.roles.includes(Role.MODERATOR)
  const userHasProfile = !!session.user.profileId

  return { user: session.user, userIsHunter, userIsModerator, userHasProfile }
}

export const userHasRole = (user: User, role: Role) => {
  return user.roles.includes(role)
}
