'use server'
import { authOptions } from '@/lib/auth'
import { updateUserAvatar } from '@/backend/user/user.service'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prismaClient'

export const importAvatarFromGithub = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    console.error('Error: Session not found')
    return null
  }

  const userGitHubDetails = await prisma.gitHubDetails.findUnique({
    where: {
      userId: session.user.id,
    },
  })

  if (!userGitHubDetails) {
    console.error('Error: User GitHub details not found')
    return null
  }

  const avatarUrl = `https://github.com/${userGitHubDetails.username}.png`

  if (!avatarUrl) {
    console.error('Error: Invalid avatarUrl')
    return null
  }

  console.log('userEmail:', session.user.email)

  const updatedUser = await updateUserAvatar(session.user.email, avatarUrl)

  return updatedUser.avatarUrl
}
