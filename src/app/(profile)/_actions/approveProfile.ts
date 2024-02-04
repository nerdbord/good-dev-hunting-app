'use server'
import { authorizeUser } from '@/app/(auth)/auth'
import { sendProfileApprovedEmail } from '@/backend/mailing/mailing.service'
import {
  findGithubUsernameByProfileId,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { requireUserRoles } from '@/utils/auths'
import { withSentry } from '@/utils/errHandling'
import { Prisma, Role } from '@prisma/client'

export const approveProfile = withSentry(
  async (profileId: string, payload: Prisma.ProfileUpdateInput) => {
    await authorizeUser()

    const isModerator = await requireUserRoles([Role.MODERATOR])

    if (!isModerator) {
      throw new Error('Unauthorized')
    }

    const updatedProfile = await updateProfileById(profileId, payload)
    const profileOwnerUsername = await findGithubUsernameByProfileId(profileId)

    await sendProfileApprovedEmail(
      updatedProfile.user.email,
      profileOwnerUsername,
    )
    await sendDiscordNotificationToModeratorChannel(
      `User's **${updatedProfile.fullName}** profile has got new status: **${updatedProfile.state}**! [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${updatedProfile.userId})`,
    )

    return updatedProfile
  },
)
