import { auth } from '@/auth'
import { findUserByEmail } from '@/backend/user/user.service'
import { Role } from '@prisma/client'

export async function requireUserRoles(roles: Role[]) {
  const session = await auth()
  const user = session && (await findUserByEmail(session.user.email))

  if (!user) return false
  return roles.some((element) => user?.roles.includes(element))
}
