'use server'

import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { createProfileViewModel } from '@/app/[locale]/(profile)/_models/profile-view.model'
import {
  createProfileView,
  findProfileViewByViewerIdAndProfileId,
  getProfileById,
  updateProfileView,
} from '@/backend/profile/profile.service'
import { type ProfileView } from '@prisma/client'

export const createOrUpdateProfileView = async (viewedProfileId: string) => {
  const { user: authorizedUser } = await getAuthorizedUser()

  if (!authorizedUser) {
    return null
  }

  const userId = authorizedUser?.id
  const foundProfile = await getProfileById(viewedProfileId)

  if (foundProfile?.userId === userId) {
    return null
  }

  let profileView: ProfileView | null = null

  const existingProfileView = await findProfileViewByViewerIdAndProfileId(
    userId,
    viewedProfileId,
  )

  if (existingProfileView) {
    profileView = await updateProfileView(existingProfileView.id)
  } else {
    profileView = await createProfileView(userId, viewedProfileId)
  }

  return createProfileViewModel(profileView)
}
