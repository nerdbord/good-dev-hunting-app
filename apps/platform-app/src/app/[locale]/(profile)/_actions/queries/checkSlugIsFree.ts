'use server'

import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { checkSlugExists } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { type Profile } from '@prisma/client'

export const checkSlugIsFree = withSentry(async (slug: Profile['slug']) => {
  const slugOwnerProfileId = await checkSlugExists(slug)
  if (!slugOwnerProfileId) return true

  const session = await getAuthorizedUser()
  if (session.user?.profileId === slugOwnerProfileId) {
    return true
  } else {
    return false
  }
})
