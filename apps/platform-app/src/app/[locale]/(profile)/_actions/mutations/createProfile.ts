'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { type ProfileCreateParams } from '@/app/[locale]/(profile)/profile.types'
import { createUserProfile } from '@/backend/profile/profile.service'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'

export const createProfile = withSentry(
  async (payload: ProfileCreateParams) => {
    const { user } = await getAuthorizedUser()
    if (!user) throw new Error('User not found')
    if (user.profileId) throw new Error('Such profile already exist')

    const createdProfile = await createUserProfile(user.email, payload)

    await mailerliteClient.addSubscriberToMailerLite(
      createdProfile.user.email,
      mailerliteGroups.devGroup,
    )

    return createProfileModel(createdProfile)
  },
)
