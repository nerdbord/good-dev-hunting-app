'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getApprovedProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findAllApprovedProfiles = cache(
  withSentry(async () => {
    const profiles = await getApprovedProfiles()

    return profiles.map(createProfileModel)
  }),
)
