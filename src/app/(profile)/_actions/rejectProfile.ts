'use server'
import { authorizeUser } from '@/app/(auth)/auth'
import { sendProfileRejectedEmail } from '@/backend/mailing/mailing.service'
import {
  findGithubUsernameByProfileId,
  getProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import {
  deleteRejectingReason,
  saveRejectingReason,
} from '@/backend/profile/rejection.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { requireUserRoles } from '@/utils/auths'
import { withSentry } from '@/utils/errHandling'
import { PublishingState, Role } from '@prisma/client'

export const rejectProfile = withSentry(
  async (profileId: string, reason: string) => {
    const { email } = await authorizeUser()

    const isModerator = await requireUserRoles([Role.MODERATOR])

    if (!isModerator) {
      throw new Error('Unauthorized')
    }

    const profile = await getProfileById(profileId)
    if (!profile) {
      throw new Error('Rejection failed, profile not found.')
    }

    const moderator = await findUserByEmail(email)
    const createdReason = await saveRejectingReason(profileId, reason)
    const profileOwnerUsername = await findGithubUsernameByProfileId(profileId)

    const updatedProfile = await updateProfileById(profile.id, {
      state: PublishingState.REJECTED,
    })

    try {
      await sendProfileRejectedEmail(profile?.userEmail, reason)
      await sendDiscordNotificationToModeratorChannel(
        `⛔️ ${moderator?.profile?.fullName || 'Moderator'} rejected ${
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
