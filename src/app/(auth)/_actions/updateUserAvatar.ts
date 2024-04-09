'use server'
import { updateAvatar } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { getAuthorizedUser } from '../helpers'

export const updateUserAvatar = withSentry(async (avatarUrl: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const updatedUser = await updateAvatar(user.email, avatarUrl)
  return updatedUser.avatarUrl
})
