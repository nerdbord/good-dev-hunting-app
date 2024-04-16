'use server'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
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

  return updatedProfile
})
