'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  getProfileByUserId,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { del } from '@vercel/blob'

export const removeMyCv = withSentry(async () => {
  const { user } = await getAuthorizedUser()
  if (!user) {
    throw new Error('User not found')
  }

  const foundProfile = await getProfileByUserId(user.id)
  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  if (foundProfile.cvUrl) {
    try {
      await del(foundProfile.cvUrl)
    } catch (blobError) {
      console.error(
        `Failed to delete CV file from Blob Storage: ${foundProfile.cvUrl}`,
        blobError,
      )
    }
  }

  const updatedProfile = await updateProfileById(foundProfile.id, {
    cvUrl: null,
  })

  return createProfileModel(updatedProfile)
})
