'use server'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { createProfileModel } from '@/app/(profile)/_models/profile.model'
import { sendProfileApprovedEmail } from '@/backend/mailing/mailing.service'
import {
  findGithubUsernameByProfileId,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

export const approveProfile = withSentry(async (profileId: string) => {
  const { user, userIsModerator } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')
  if (!userIsModerator) throw new Error('Unauthorized')

  const updatedProfile = await updateProfileById(profileId, {
    state: PublishingState.APPROVED,
  })

  const profileOwnerUsername = await findGithubUsernameByProfileId(profileId)

  await sendProfileApprovedEmail(
    updatedProfile.user.email,
    profileOwnerUsername,
  )

  await sendDiscordNotificationToModeratorChannel(
    `✅ ${user.name || 'Moderator'} approved ${
      updatedProfile.fullName
    } profile. [Show Profile](${
      process.env.NEXT_PUBLIC_APP_ORIGIN_URL
    }/moderation/profile/${updatedProfile.userId})`,
  )

  return createProfileModel(updatedProfile)
})
