'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getProfileByLinkedinUsername } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const findProfileByLinkedinUsername = withSentry(
  async (username: string) => {
    const profile = await getProfileByLinkedinUsername(username)

    if (!profile) {
      //   throw new Error(`Profile with username ${username} not found`)
      return null
    }

    return createProfileModel(profile)
  },
)
