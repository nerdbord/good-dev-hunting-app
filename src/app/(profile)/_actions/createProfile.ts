'use server'

import { getAuthorizedUser } from '@/app/(auth)/helpers'
import { type ProfilePayload } from '@/app/(profile)/types'
import { serializeProfileToProfileModel } from '@/backend/profile/profile.serializer'
import { createUserProfile } from '@/backend/profile/profile.service'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { withSentry } from '@/utils/errHandling'

export const createProfile = withSentry(async (payload: ProfilePayload) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')
  if (user.profileId) throw new Error('Such profile already exist')

  const createdProfile = await createUserProfile(user.email, payload)
  const serializedProfile = serializeProfileToProfileModel(createdProfile)

  await mailerliteClient.addSubscriberToMailerLite(
    createdProfile.user.email,
    mailerliteGroups.devGroup,
  )

  return serializedProfile
})
