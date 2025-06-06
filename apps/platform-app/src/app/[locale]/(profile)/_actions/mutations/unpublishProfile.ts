'use server'
import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

export const unpublishProfile = withSentry(async (profileId: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const foundProfile = await findProfileById(profileId)

  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const updatedProfile = await updateProfileById(foundProfile.id, {
    state: PublishingState.DRAFT,
  })

  await sendDiscordNotificationToModeratorChannel(
    `User's **${updatedProfile.fullName}** has unpublished profile`,
  )

  return createProfileModel(updatedProfile)
})
