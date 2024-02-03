'use server'
import { authorizeUser } from '@/app/(auth)/auth'
import { sendProfileApprovedEmail } from '@/backend/mailing/mailing.service'
import { updateProfileById } from '@/backend/profile/profile.service'
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

    await sendProfileApprovedEmail(updatedProfile.user.email)

    return updatedProfile
  },
)
