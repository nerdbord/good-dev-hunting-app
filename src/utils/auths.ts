import { findUserByEmail } from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

export async function requireUserRoles(roles: Role[]) {
  const session = await getServerSession(authOptions)
  const user = session && (await findUserByEmail(session.user.email))

  if (!user) return false
  return roles.some((element) => user?.roles.includes(element))
}
