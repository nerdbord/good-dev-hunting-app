'use server'
import { authOptions } from '@/app/(auth)/auth'
import { updateUserAvatar } from '@/backend/user/user.service'
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
