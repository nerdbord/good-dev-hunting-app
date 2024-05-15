'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getTeamProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findAllTeamProfiles = cache(
  withSentry(async () => {
    const profiles = await getTeamProfiles()

    return profiles.map(createProfileModel)
  }),
)
