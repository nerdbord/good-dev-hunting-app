'use server'
import { authOptions } from '@/app/(auth)/auth'
import {
  findUserByEmail,
  getGitHubDetails,
  updateUserAvatar,
} from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { getServerSession } from 'next-auth'

export const importAvatarFromGithub = withSentry(async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user.email) {
    throw new Error('User not found')
  }

  const user = await findUserByEmail(session.user.email)
  if (!user) {
    throw new Error('User not found')
  }

  const userGitHubDetails = await getGitHubDetails(user.id)
  if (!userGitHubDetails) {
    throw new Error('User not found')
  }

  const avatarUrl = `https://github.com/${userGitHubDetails.username}.png`
  if (!avatarUrl) {
    throw new Error('Avatar not found')
  }

  const updatedUser = await updateUserAvatar(session.user.email, avatarUrl)

  return updatedUser.avatarUrl
})
