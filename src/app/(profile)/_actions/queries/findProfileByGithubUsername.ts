'use server'

import { getProfileByGithubUsername } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const findProfileByGithubUsername = withSentry(
  async (username: string) => {
    const profile = await getProfileByGithubUsername(username)

    if (!profile) {
      throw new Error(`Profile with username ${username} not found`)
    }

    return profile
  },
)
