'use server'
import { updateUserRole } from '@/backend/user/user.service'
import { Role } from '@prisma/client'

export const assignAdminRole = async (id: string, roles: Role[]) => {
  try {
    const newRoles = roles.includes(Role.MODERATOR)
      ? roles
      : [...roles, Role.MODERATOR]
    await updateUserRole(id, newRoles)
  } catch (error) {
    console.error('Error assigning role:', error)
  }
}

export const unAssignAdminRole = async (id: string, roles: Role[]) => {
  try {
    const updatedRoles = roles.filter((role) => role !== Role.MODERATOR)
    await updateUserRole(id, updatedRoles)
  } catch (error) {
    console.error('Error unassigning role:', error)
  }
}

export const useAssignAdminRole = () => {
  return async (userId: string, roles: Role[]) => {
    await assignAdminRole(userId, roles)
  }
}

export const useUnassignAdminRole = () => {
  return async (userId: string, roles: Role[]) => {
    await unAssignAdminRole(userId, roles)
  }
}
