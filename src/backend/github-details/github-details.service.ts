import { prisma } from '@/lib/prismaClient'

export async function updateGithubDetailsById(
  id: string,
  credentials: { username: string; email: string },
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
