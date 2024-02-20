import {
  getProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { Prisma } from '@prisma/client'

export const countProfileViews = withSentry(
  async (profileId: string, payload: Prisma.ProfileUpdateInput) => {
    const foundProfile = await getProfileById(profileId)

    if (!foundProfile) {
      throw new Error('Profile not found')
    }

    payload.viewCount = foundProfile.viewCount + 1

    updateProfileById(profileId, payload)

    const updatedProfile = await updateProfileById(profileId, payload)

    return updatedProfile
  },
)
