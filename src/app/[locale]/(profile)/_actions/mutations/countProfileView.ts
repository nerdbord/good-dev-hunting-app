'use server'
import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  getProfileById,
  incrementProfileViewCountById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const countProfileView = withSentry(
  async (profileId: string, userId?: string) => {
    const foundProfile = await getProfileById(profileId)

    if (foundProfile?.userId !== userId) {
      const updatedProfile = await incrementProfileViewCountById(profileId)
      return updatedProfile
    }
    return createProfileModel(foundProfile)
  },
)
