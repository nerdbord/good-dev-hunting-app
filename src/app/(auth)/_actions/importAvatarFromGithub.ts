'use server'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { updateAvatar } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'

export const importAvatarFromGithub = withSentry(async () => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')
  if (!user.githubUsername) throw new Error('Github Username not found')

  const avatarUrl = `https://github.com/${user.githubUsername}.png`
  if (!avatarUrl) {
    throw new Error('Avatar not found')
  }

  const updatedUser = await updateAvatar(user.email, avatarUrl)

  return updatedUser.avatarUrl
})
