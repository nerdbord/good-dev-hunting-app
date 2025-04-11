'use server'

import { prisma } from '@/lib/prismaClient'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { revalidatePath } from 'next/cache'
import { createUserModel } from '../../_models/User.model'

export const updatePreferredLanguage = withSentry(
  async (newLanguage: string) => {
    const { user } = await getAuthorizedUser()

    if (!user) {
      throw new Error('User not authenticated')
    }

    // Basic validation (optional, could rely on routing.locales)
    if (!['en', 'pl'].includes(newLanguage)) {
      throw new Error('Invalid language specified')
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { preferredLanguage: newLanguage },
      include: {
        githubDetails: true,
        profile: true,
      },
    })

    // Revalidate paths if needed, though session update might be enough
    revalidatePath('/') // Example: revalidate home page

    return createUserModel(updatedUser)
  },
)
