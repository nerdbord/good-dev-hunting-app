'use server'

import { ProfileModel } from '@/app/(profile)/_models/profile.model'
import { getApprovedProfiles } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const findAllPublishedProfiles = withSentry(async () => {
  const profiles = await getApprovedProfiles()

  const serializedProfiles = profiles.map(
    (profile) => new ProfileModel(profile),
  )

  return serializedProfiles
})
