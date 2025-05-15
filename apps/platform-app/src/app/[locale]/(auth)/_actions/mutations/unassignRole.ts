'use server'
import { createUserModel } from '@/app/[locale]/(auth)/_models/User.model'
import { removeUserRole } from '@/backend/user/user.service'
import { type Role } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'

export const unassignRole = async (id: string, role: Role) => {
  try {
    const updatedUser = await removeUserRole(id, role)

    if (!updatedUser) {
      throw new Error('Failed to assign role')
    }

    return createUserModel(updatedUser)
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
}
