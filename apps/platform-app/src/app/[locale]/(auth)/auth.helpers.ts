import { auth } from '@/auth'
import { Role, type User } from '@prisma/client'
import { type Session } from 'next-auth'

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
    return {
      user: null,
      userIsHunter: false,
      userIsSpecialist: false,
      userIsModerator: false,
      provider: null,
    }
  }

  const userIsHunter = session?.user?.roles.includes(Role.HUNTER)
  const userIsSpecialist = session?.user?.roles.includes(Role.SPECIALIST)
  const userIsModerator = session?.user?.roles.includes(Role.MODERATOR)
  const userHasProfile = !!session?.user?.profileId

  return {
    user: session.user,
    userIsHunter,
    userIsSpecialist,
    userIsModerator,
    userHasProfile,
    provider: session.provider,
  }
}

export const userHasRole = (user: User | Session['user'], role: Role) => {
  return user.roles.includes(role)
}
