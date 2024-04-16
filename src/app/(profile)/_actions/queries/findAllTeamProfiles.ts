'use server'

import { getTeamProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const findAllTeamProfiles = withSentry(async () => {
  const profiles = await getTeamProfiles()

  return profiles
})
