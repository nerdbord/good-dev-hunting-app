'use server'
import { authOptions } from '@/lib/auth'
import { getGitHubDetails, updateUserAvatar } from '@/backend/user/user.service'
import { getServerSession } from 'next-auth'

export const importAvatarFromGithub = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    console.error('Error: Session not found')
    return null
  }

  const userGitHubDetails = await getGitHubDetails(session.user.id)

  if (!userGitHubDetails) {
    console.error('Error: User GitHub details not found')
    return null
  }

  const avatarUrl = `https://github.com/${userGitHubDetails.username}.png`

  if (!avatarUrl) {
    console.error('Error: Invalid avatarUrl')
    return null
  }

  const updatedUser = await updateUserAvatar(session.user.email, avatarUrl)

  return updatedUser.avatarUrl
}
