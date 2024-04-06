'use server'
import { authorizeUser } from '@/app/(auth)/helpers'
import { findUserByEmail } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'

export const fetchUserAvatar = withSentry(async () => {
  const { email } = await authorizeUser()
  const user = await findUserByEmail(email)
  return user?.avatarUrl || null
})
