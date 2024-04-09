'use server'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const lockProfile = withSentry(async (profileId: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const foundProfile = await findProfileById(profileId)
  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const updatedProfile = await updateProfileById(profileId, {
    isOpenForWork: false,
  })

  return updatedProfile
})
