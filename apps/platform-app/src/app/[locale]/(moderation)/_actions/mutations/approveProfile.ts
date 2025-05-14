'use server'
import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { sendProfileApprovedEmail } from '@/backend/mailing/mailing.service'
import { updateProfileById } from '@/backend/profile/profile.service'
import { notifyProfileApproved } from '@/lib/discord'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

export const approveProfile = withSentry(async (profileId: string) => {
  const { user, userIsModerator } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')
  if (!userIsModerator) throw new Error('Unauthorized')

  const updatedProfile = await updateProfileById(profileId, {
    state: PublishingState.APPROVED,
  })

  await sendProfileApprovedEmail({
    email: updatedProfile.user.email,
    githubUsername:
      updatedProfile.user.githubDetails?.username || updatedProfile.fullName,
    locale: user.language,
  })

  await notifyProfileApproved({
    id: updatedProfile.id,
    username:
      updatedProfile.user.githubDetails?.username || updatedProfile.fullName,
    userId: updatedProfile.userId,
  })

  return createProfileModel(updatedProfile)
})
