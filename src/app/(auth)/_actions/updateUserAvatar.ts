'use server'
import { updateAvatar } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { auth } from '../../../auth'

export const updateUserAvatar = withSentry(async (avatarUrl: string) => {
  const session = await auth()

  if (!session?.user.email) {
    throw new Error('User not found')
  }
  const updatedUser = await updateAvatar(session.user.email, avatarUrl)
  return updatedUser.avatarUrl
})
