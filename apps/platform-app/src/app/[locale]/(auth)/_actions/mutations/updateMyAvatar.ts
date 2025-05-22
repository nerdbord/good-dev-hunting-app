'use server'
import { updateAvatar } from '@/backend/user/user.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'

export const updateMyAvatar = withSentry(async (avatarUrl: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const updatedUser = await updateAvatar(user.email, avatarUrl)
  return updatedUser.avatarUrl
})
