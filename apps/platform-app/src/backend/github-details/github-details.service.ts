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

export async function createOrUpdateGitHubDetailsForUser(
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

  // If GitHub details already exist, check if they need to be updated
  if (user.githubDetails) {
    if (user.githubDetails.username === githubUsername) {
      // If the GitHub username is the same, return the existing details
      return user.githubDetails
    } else {
      // If the GitHub username is different, update it
      const updatedGitHubDetails = await prisma.gitHubDetails.update({
        where: { id: user.githubDetails.id },
        data: { username: githubUsername },
      })
      return updatedGitHubDetails
    }
  }

  // If no GitHub details exist, create new ones
  const githubDetails = await prisma.gitHubDetails.create({
    data: {
      userId: userId,
      username: githubUsername,
    },
  })

  return githubDetails
}
