import { prisma } from '@/lib/prismaClient'
import { PublishingState } from '@prisma/client'

export async function getCountries() {
  return await prisma.country.findMany({
    where: {
      profile: {
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
