'use server'

import { ProfileModel } from '@/app/(profile)/_models/profile.model'
import { getTeamProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const findAllTeamProfiles = withSentry(async () => {
  const profiles = await getTeamProfiles()

  const serializedProfiles = profiles.map(
    (profile) => new ProfileModel(profile),
  )

  return serializedProfiles
})
