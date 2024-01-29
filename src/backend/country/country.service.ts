import { prisma } from '@/lib/prismaClient'

export async function getCountries() {
  return await prisma.country.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}
