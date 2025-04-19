'use server'

import { prisma } from '@/lib/prismaClient'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import type { UserLanguage } from '@prisma/client'

export const updatePreferredLanguage = withSentry(
  async (language: UserLanguage) => {
    const { user } = await getAuthorizedUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { language },
        select: { id: true, language: true },
      })

      return { success: true, language: updatedUser.language }
    } catch (error) {
      throw new Error('Failed to update language preference.')
    }
  },
)
