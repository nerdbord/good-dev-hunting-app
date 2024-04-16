'use server'

import { getAllProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findAllProfiles = cache(
  withSentry(async () => {
    const profiles = await getAllProfiles()

    return profiles
  }),
)
