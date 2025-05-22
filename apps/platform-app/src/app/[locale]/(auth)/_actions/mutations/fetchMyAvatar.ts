'use server'
import { findUserByEmail } from '@/backend/user/user.service'
import { authorizeUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'

export const fetchMyAvatar = withSentry(async () => {
  const { email } = await authorizeUser()
  const user = await findUserByEmail(email)
  return user?.avatarUrl || null
})
