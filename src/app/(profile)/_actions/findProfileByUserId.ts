'use server'

import { ProfileModel } from '@/app/(profile)/_models/profile.model'
import { getProfileByUserId } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const findProfileByUserId = withSentry(async (userId: string) => {
  const profile = await getProfileByUserId(userId)

  if (!profile) {
    throw new Error(`Profile with userId ${userId} not found`)
  }

  return new ProfileModel(profile)
})
