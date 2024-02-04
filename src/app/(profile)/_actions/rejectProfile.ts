'use server'
import { authorizeUser } from '@/app/(auth)/auth'
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
import { requireUserRoles } from '@/utils/auths'
import { withSentry } from '@/utils/errHandling'
import { PublishingState, Role } from '@prisma/client'

export const rejectProfile = withSentry(
  async (profileId: string, reason: string) => {
    await authorizeUser()

    const isModerator = await requireUserRoles([Role.MODERATOR])

    if (!isModerator) {
      throw new Error('Unauthorized')
    }

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
        `User's **${updatedProfile.fullName}** profile has got new status: **${updatedProfile.state}**! [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${updatedProfile.userId})`,
      )
      return updatedProfile
    } catch (error) {
      await deleteRejectingReason(createdReason.id)
      return updatedProfile
    }
  },
)
