'use server'
import {
  getProfileById,
  incrementProfileViewCountById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const countProfileView = withSentry(
  async (profileId: string, userProfileId?: string) => {
    const foundProfile = await getProfileById(profileId)

    if (profileId === userProfileId) {
      throw new Error("User can't incerement own profile view count")
    } else {
      const updatedProfile = await incrementProfileViewCountById(profileId)
    }
  },
)
