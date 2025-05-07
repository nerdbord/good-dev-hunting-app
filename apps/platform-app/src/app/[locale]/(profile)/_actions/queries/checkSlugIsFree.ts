'use server'

import { checkSlugExists } from '@/backend/profile/profile.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
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
