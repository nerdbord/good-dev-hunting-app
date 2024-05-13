'use server'
import { authorizeUser } from '@/app/[locale]/(auth)/auth.helpers'
import { findUserByEmail } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'

export const fetchMyAvatar = withSentry(async () => {
  const { email } = await authorizeUser()
  const user = await findUserByEmail(email)
  return user?.avatarUrl || null
})
