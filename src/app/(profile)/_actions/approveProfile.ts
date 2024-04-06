'use server'
import { authorizeUser } from '@/app/(auth)/helpers'
import { sendProfileApprovedEmail } from '@/backend/mailing/mailing.service'
import {
  findGithubUsernameByProfileId,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { requireUserRoles } from '@/utils/auths'
import { withSentry } from '@/utils/errHandling'
import { Role, type Prisma } from '@prisma/client'

export const approveProfile = withSentry(
  async (profileId: string, payload: Prisma.ProfileUpdateInput) => {
    const { email } = await authorizeUser()

    const isModerator = await requireUserRoles([Role.MODERATOR])

    if (!isModerator) {
      throw new Error('Unauthorized')
    }

    const moderator = await findUserByEmail(email)

    const updatedProfile = await updateProfileById(profileId, payload)
    const profileOwnerUsername = await findGithubUsernameByProfileId(profileId)

    await sendProfileApprovedEmail(
      updatedProfile.user.email,
      profileOwnerUsername,
    )

    await sendDiscordNotificationToModeratorChannel(
      `✅ ${moderator?.profile?.fullName || 'Moderator'} approved ${
        updatedProfile.fullName
      } profile. [Show Profile](${
        process.env.NEXT_PUBLIC_APP_ORIGIN_URL
      }/moderation/profile/${updatedProfile.userId})`,
    )

    return updatedProfile
  },
)
