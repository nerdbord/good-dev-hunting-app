'use server'
import { removeUserRole } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { Role } from '@prisma/client'

export const unassignRole = withSentry(async (id: string, role: Role) => {
  await removeUserRole(id, role)
})
