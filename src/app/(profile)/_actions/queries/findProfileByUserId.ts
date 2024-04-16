'use server'

import { getProfileByUserId } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findProfileByUserId = cache(
  withSentry(async (userId: string) => {
    const profile = await getProfileByUserId(userId)

    if (!profile) {
      return null
    }

    return profile
  }),
)
