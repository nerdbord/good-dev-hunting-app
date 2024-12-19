'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getProfileBySlug } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { type Profile } from '@prisma/client'

export const findProfileBySlug = withSentry(async (slug: Profile['slug']) => {
  const profile = await getProfileBySlug(slug)

  if (!profile) {
    console.error(`Profile with slug ${slug} not found`)
    return null
  }

  return createProfileModel(profile)
})
