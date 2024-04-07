import { auth } from '@/auth'
import { findUserByEmail } from '@/backend/user/user.service'
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

  const user = session?.user.email
    ? await findUserByEmail(session.user.email)
    : null

  const userIsHunter = user && userHasRole(user, Role.HUNTER)
  const userIsModerator = user && userHasRole(user, Role.MODERATOR)

  return { user, userIsHunter, userIsModerator }
}

export const userHasRole = (user: User, role: Role) => {
  return user.roles.includes(role)
}
