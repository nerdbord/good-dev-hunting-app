import { prisma } from '@/lib/prismaClient'

// redundant name
export async function getTechnologies() {
  return await prisma.technology.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}
