'use server'

import {
  getProfileById,
  updateOrCreateProfileView,
} from '@/backend/profile/profile.service'

export const updateOrCreateProfileViewAction = async (
  viewerID: string,
  viewedProfileID: string,
) => {
  const foundProfile = await getProfileById(viewedProfileID)

  if (foundProfile?.userId === viewerID) {
    return null
  }

  const profileView = await updateOrCreateProfileView(viewerID, viewedProfileID)
  return profileView
}
