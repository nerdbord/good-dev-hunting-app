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
