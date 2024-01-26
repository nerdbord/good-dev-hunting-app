import { updateUserRole } from '@/backend/user/user.service'
import { Role } from '@prisma/client'

export async function handleAssignRole(
  id: string,
  userRoles: Role[],
  onClose: () => void,
) {
  try {
    // Dodaj rolę MODERATOR
    await updateUserRole(id, { roles: { set: [...userRoles, Role.MODERATOR] } })
    onClose()
  } catch (error) {
    console.error('Error assigning role:', error)
  }
}

export async function handleUnassignRole(
  id: string,
  userRoles: Role[],
  onClose: () => void,
) {
  try {
    // Usuń rolę MODERATOR
    const updatedRoles = userRoles.filter((role) => role !== Role.MODERATOR)
    await updateUserRole(id, { roles: { set: updatedRoles } })
    onClose()
  } catch (error) {
    console.error('Error unassigning role:', error)
  }
}
