import {
  getProfileById,
  incrementProfileViewCountById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const countProfileView = withSentry(
  async (profileId: string, userId: string) => {
    const foundProfile = await getProfileById(profileId)

    if (profileId !== userId) {
      const updatedProfile = await incrementProfileViewCountById(profileId)
    }
  },
)
