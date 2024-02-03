'use server'
import { authorizeUser } from '@/app/(auth)/auth'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const lockProfile = withSentry(async (profileId: string) => {
  await authorizeUser()
  const foundProfile = await findProfileById(profileId)

  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const updatedProfile = await updateProfileById(profileId, {
    isOpenForWork: false,
  })

  return updatedProfile
})
