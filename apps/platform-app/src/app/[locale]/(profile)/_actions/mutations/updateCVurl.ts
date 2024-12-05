'use server'

import { updateCVurlByProfileId } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const updateCVurl = withSentry(
  async (profileId: string, cvUrl: string) => {
    const updatedCVurl = await updateCVurlByProfileId(profileId, cvUrl)
    return updatedCVurl.cvUrl
  },
)
