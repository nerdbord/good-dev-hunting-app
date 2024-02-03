'use server'
import { addUserRole } from '@/backend/user/user.service'
import { Role } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'

export const assignRole = async (id: string, role: Role) => {
  try {
    await addUserRole(id, role)
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
}
