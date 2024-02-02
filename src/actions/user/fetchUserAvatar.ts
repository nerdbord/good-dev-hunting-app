'use server'
import { findUserByEmail } from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
import { withSentry } from '@/utils/errHandling'
import { getServerSession } from 'next-auth'

export const fetchUserAvatar = withSentry(async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user.email) {
    throw new Error('User not found')
  }
  const user = await findUserByEmail(session.user.email)
  return user?.avatarUrl || null
})
