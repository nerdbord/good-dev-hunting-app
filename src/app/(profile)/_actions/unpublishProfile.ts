'use server'
import { authorizeUser } from '@/app/(auth)/auth'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

export const unpublishProfile = withSentry(async (profileId: string) => {
  await authorizeUser()
  const foundProfile = await findProfileById(profileId)

  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const updatedProfile = await updateProfileById(foundProfile.id, {
    state: PublishingState.DRAFT,
  })

  await sendDiscordNotificationToModeratorChannel(
    `User's **${updatedProfile.fullName}** profile has got new status: **${updatedProfile.state}**! [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${updatedProfile.userId})`,
  )

  return updatedProfile
})
