'use server'

import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'

export const findAllPublishedProfiles = async () => {
  const profiles = await getPublishedProfilesPayload()
  return profiles
}
