import { prisma } from '@/lib/prismaClient'
import { type Prisma } from '@prisma/client'

export async function updateGithubDetailsById(
  id: string,
  credentials: Prisma.GitHubDetailsUpdateInput,
) {
  const result = await prisma.gitHubDetails.update({
    data: { ...credentials },
    where: {
      id,
    },
    include: {
      user: true,
    },
  })
  return result
}

export async function createGitHubDetailsForUser(
  userId: string,
  githubUsername: string,
) {
  // Check if the user exists and does not have GitHubDetails
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { githubDetails: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (user.githubDetails) {
    throw new Error('User already has GitHub details')
  }

  // Create GitHub details for the user
  const githubDetails = await prisma.gitHubDetails.create({
    data: {
      userId: userId,
      username: githubUsername,
    },
  })

  return githubDetails
}
