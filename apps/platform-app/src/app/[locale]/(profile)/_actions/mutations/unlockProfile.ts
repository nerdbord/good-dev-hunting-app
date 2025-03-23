'use server'
import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'

export const unlockProfile = withSentry(async (profileId: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const foundProfile = await findProfileById(profileId)

  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const updatedProfile = await updateProfileById(profileId, {
    isOpenForWork: true,
  })

  return createProfileModel(updatedProfile)
})
