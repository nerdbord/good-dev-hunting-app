'use server'
import {
  findUserByEmail,
  getGitHubDetails,
  updateAvatar,
} from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { auth } from '../../../auth'

export const importAvatarFromGithub = withSentry(async () => {
  const session = await auth()
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

  const updatedUser = await updateAvatar(session.user.email, avatarUrl)

  return updatedUser.avatarUrl
})
