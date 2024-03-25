'use server'

import { authorizeUser } from '@/app/(auth)/helpers'
import { ProfilePayload } from '@/app/(profile)/types'
import { serializeProfileToProfileModel } from '@/backend/profile/profile.serializer'
import {
  createUserProfile,
  findProfileWithUserInclude,
} from '@/backend/profile/profile.service'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { withSentry } from '@/utils/errHandling'

export const createProfile = withSentry(async (payload: ProfilePayload) => {
  const { email } = await authorizeUser()
  const foundProfile = await findProfileWithUserInclude(email)

  if (foundProfile) {
    throw new Error('Such profile already exist')
  }

  const createdProfile = await createUserProfile(email, payload)
  const serializedProfile = serializeProfileToProfileModel(createdProfile)

  await mailerliteClient.addSubscriberToMailerLite(
    createdProfile.user.email,
    mailerliteGroups.devGroup,
  )

  return serializedProfile
})
