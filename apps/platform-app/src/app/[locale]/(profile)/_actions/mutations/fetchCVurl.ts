'use server'

import { authorizeUser } from '@/app/[locale]/(auth)/auth.helpers'
import { findUserByEmail } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'

export const fetchCVurl = withSentry(async () => {
  const { email } = await authorizeUser()
  const user = await findUserByEmail(email)
  return user?.profile?.cvUrl || null
})
