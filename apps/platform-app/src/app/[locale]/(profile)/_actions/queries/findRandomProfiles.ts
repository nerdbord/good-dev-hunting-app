'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getRandomApprovedProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findRandomProfiles = cache(
  withSentry(async (take: number) => {
    const profiles = await getRandomApprovedProfiles(take)

    return profiles.map(createProfileModel)
  }),
)
