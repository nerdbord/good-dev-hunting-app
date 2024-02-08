import { prisma } from '@/lib/prismaClient'
import { PublishingState } from '@prisma/client'

export async function getTechnologies() {
  return await prisma.technology.findMany({
    where: {
      profiles: {
        some: {
          state: PublishingState.APPROVED,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}
