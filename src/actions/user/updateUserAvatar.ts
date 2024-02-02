'use server'
import { updateUserAvatar } from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
import { withSentry } from '@/utils/errHandling'
import { getServerSession } from 'next-auth'

export const serverUpdateUserAvatar = withSentry(async (avatarUrl: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    throw new Error('User not found')
  }
  const updatedUser = await updateUserAvatar(session.user.email, avatarUrl)
  return updatedUser.avatarUrl
})
