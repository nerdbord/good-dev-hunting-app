import {
  getProfileById,
  incrementProfileViewCountById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { Prisma } from '@prisma/client'

export const countProfileViews = withSentry(
  async (
    profileId: string,
    userId: string,
    payload: Prisma.ProfileUpdateInput,
  ) => {
    const foundProfile = await getProfileById(profileId)

    if (!foundProfile) {
      throw new Error('Profile not found')
    }

    if (foundProfile.userId !== userId) {
      const updatedProfile = await incrementProfileViewCountById(
        profileId,
        payload,
      )

      return updatedProfile
    }
  },
)
