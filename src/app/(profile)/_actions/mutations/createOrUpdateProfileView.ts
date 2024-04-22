'use server'

import {
  createProfileView,
  findProfileViewByViewerIdAndProfileId,
  getProfileById,
  updateProfileView,
} from '@/backend/profile/profile.service'

export const createOrUpdateProfileView = async (
  viewerID: string,
  viewedProfileID: string,
) => {
  const foundProfile = await getProfileById(viewedProfileID)

  if (foundProfile?.userId === viewerID) {
    return null
  }

  const existingProfileView = await findProfileViewByViewerIdAndProfileId(
    viewerID,
    viewedProfileID,
  )

  if (existingProfileView) {
    return updateProfileView(existingProfileView.id)
  }

  const newProfileView = await createProfileView(viewerID, viewedProfileID)

  return newProfileView
}
