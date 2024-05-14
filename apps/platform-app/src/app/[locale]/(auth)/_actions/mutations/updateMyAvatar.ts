'use server'
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { updateAvatar } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'

export const updateMyAvatar = withSentry(async (avatarUrl: string) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const updatedUser = await updateAvatar(user.email, avatarUrl)
  return updatedUser.avatarUrl
})
