'use server'

import { countAllApprovedProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const getApprovedProfilesCount = cache(
  withSentry(async () => {
    const count = await countAllApprovedProfiles()
    return count
  }),
)

export const getDisplayProfilesCount = cache(
  withSentry(async () => {
    const count = await countAllApprovedProfiles()
    return Math.max(0, count - 1)
  }),
)
