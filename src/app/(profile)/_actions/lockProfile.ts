'use server'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { ProfileModel } from '@/app/(profile)/_models/profile.model'
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

  return new ProfileModel(updatedProfile)
})
