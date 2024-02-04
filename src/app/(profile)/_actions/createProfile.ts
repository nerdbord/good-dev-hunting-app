'use server'
import { authorizeUser } from '@/app/(auth)/auth'

import { ProfilePayload } from '@/app/(profile)/types'
import { serializeProfileToProfileModel } from '@/backend/profile/profile.serializer'
import {
  createUserProfile,
  findProfileWithUserInclude,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const createProfile = withSentry(async (payload: ProfilePayload) => {
  const { email } = await authorizeUser()
  const foundProfile = await findProfileWithUserInclude(email)

  if (foundProfile) {
    throw new Error('Such profile already exist')
  }

  const createdProfile = await createUserProfile(email, payload)
  const serializedProfile = serializeProfileToProfileModel(createdProfile)

  return serializedProfile
})
