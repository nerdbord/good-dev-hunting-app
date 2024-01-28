'use server'
import { removeUserRole } from '@/backend/user/user.service'
import { Role } from '@prisma/client'

export const unassignRole = async (id: string, role: Role) => {
  try {
    await removeUserRole(id, role)
  } catch (error) {
    console.error('Error unassigning role:', error)
  }
}
