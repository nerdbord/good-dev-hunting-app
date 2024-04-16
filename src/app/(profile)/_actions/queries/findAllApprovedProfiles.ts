'use server'

import { getApprovedProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findAllApprovedProfiles = cache(
  withSentry(async () => {
    const profiles = await getApprovedProfiles()

    return profiles
  }),
)
