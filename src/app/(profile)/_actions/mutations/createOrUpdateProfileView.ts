'use server'

import { createProfileViewModel } from '@/app/(profile)/_models/profile-view.model'
import {
  createProfileView,
  findProfileViewByViewerIdAndProfileId,
  getProfileById,
  updateProfileView,
} from '@/backend/profile/profile.service'
import { type ProfileView } from '@prisma/client'

export const createOrUpdateProfileView = async (
  viewerID: string,
  viewedProfileID: string,
) => {
  let profileView: ProfileView | null = null

  const foundProfile = await getProfileById(viewedProfileID)

  if (foundProfile?.userId === viewerID) {
    return null
  }

  const existingProfileView = await findProfileViewByViewerIdAndProfileId(
    viewerID,
    viewedProfileID,
  )

  if (existingProfileView) {
    profileView = await updateProfileView(existingProfileView.id)
  } else {
    profileView = await createProfileView(viewerID, viewedProfileID)
  }

  return createProfileViewModel(profileView)
}
