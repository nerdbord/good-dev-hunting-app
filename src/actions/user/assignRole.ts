'use server'
import { addUserRole } from '@/backend/user/user.service'
import { Role } from '@prisma/client'

export const assignRole = async (id: string, role: Role) => {
  try {
    await addUserRole(id, role)
  } catch (error) {
    console.error('Error assigning role:', error)
  }
}
