'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getProfileByUserId } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findProfileByUserId = cache(
  withSentry(async (userId: string) => {
    const profile = await getProfileByUserId(userId)

    if (!profile) {
      return null
    }

    return createProfileModel(profile)
  }),
)
