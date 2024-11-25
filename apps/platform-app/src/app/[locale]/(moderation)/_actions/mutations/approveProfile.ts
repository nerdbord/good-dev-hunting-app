'use server'
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
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

  const profileOwnerUsername = (await findGithubUsernameByProfileId(
    profileId,
  )) as string

  await sendProfileApprovedEmail(
    updatedProfile.user.email,
    profileOwnerUsername,
  ) // does not open profile from email button. template changed? CC: Sumick

  await sendDiscordNotificationToModeratorChannel(
    `✅ ${user.name || 'Moderator'} approved ${
      updatedProfile.fullName
    } profile. [Show Profile](${
      process.env.NEXT_PUBLIC_APP_ORIGIN_URL
    }/moderation/profile/${updatedProfile.userId})`,
  )

  return createProfileModel(updatedProfile)
})
