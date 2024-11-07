'use server'
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { runEvaluateProfileAgent } from '@/app/[locale]/(profile)/_workflows/profile-evaluation.workflow'
import {
  findProfileById,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

export const publishProfile = withSentry(async (profileId: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const foundProfile = await findProfileById(profileId)

  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const updatedProfile = await updateProfileById(foundProfile.id, {
    state: PublishingState.PENDING,
  })

  await runEvaluateProfileAgent(foundProfile.id)

  return createProfileModel(updatedProfile)
})
