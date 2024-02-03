'use server'
import { authorizeUser } from '@/app/(auth)/auth'

import { CreateProfilePayload } from '@/app/(profile)/types'
import { serializeProfileToProfileModel } from '@/backend/profile/profile.serializer'
import {
  createUserProfile,
  doesUserProfileExist,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'

export const createProfile = withSentry(
  async (payload: CreateProfilePayload) => {
    const { email } = await authorizeUser()
    const foundProfile = await doesUserProfileExist(email)

    if (foundProfile) {
      throw new Error('Such profile already exist')
    }

    const createdProfile = await createUserProfile(email, payload)
    const serializedProfile = serializeProfileToProfileModel(createdProfile)

    return serializedProfile
  },
)
