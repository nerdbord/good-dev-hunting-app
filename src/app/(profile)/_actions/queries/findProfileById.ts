'use server'

import { getProfileById } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findProfileById = cache(
  withSentry(async (profileId: string) => {
    const profile = await getProfileById(profileId)

    return profile
  }),
)
