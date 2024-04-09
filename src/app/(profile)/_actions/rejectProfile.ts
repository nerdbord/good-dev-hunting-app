'use server'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import { sendProfileRejectedEmail } from '@/backend/mailing/mailing.service'
import {
  getProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import {
  deleteRejectingReason,
  saveRejectingReason,
} from '@/backend/profile/rejection.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

export const rejectProfile = withSentry(
  async (profileId: string, reason: string) => {
    const { user, userIsModerator } = await getAuthorizedUser()
    if (!user) throw new Error('User not found')
    if (!userIsModerator) throw new Error('Unauthorized')

    const profile = await getProfileById(profileId)
    if (!profile) {
      throw new Error('Rejection failed, profile not found.')
    }

    const createdReason = await saveRejectingReason(profileId, reason)
    const updatedProfile = await updateProfileById(profile.id, {
      state: PublishingState.REJECTED,
    })

    try {
      await sendProfileRejectedEmail(profile?.userEmail, reason)
      await sendDiscordNotificationToModeratorChannel(
        `⛔️ ${user.name || 'Moderator'} rejected ${
          updatedProfile.fullName
        } profile. Reason: ${reason} [Show Profile](${
          process.env.NEXT_PUBLIC_APP_ORIGIN_URL
        }/moderation/profile/${updatedProfile.userId})`,
      )
      return updatedProfile
    } catch (error) {
      await deleteRejectingReason(createdReason.id)
      return updatedProfile
    }
  },
)
