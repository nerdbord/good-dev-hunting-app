'use server'

import { getProfileById } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'


export const fetchCVurl = withSentry(async (id: string) => {
  
  const profileId = await getProfileById(id)
  return profileId.cvUrl || null
})