import { prisma } from '@/lib/prismaClient'

export async function findIpTrack(ip: string) {
  return prisma.ipTrack.findUnique({
    where: {
      ip,
    },
  })
}

// export async function upsertIpTrack(ip: string, profileIds: string[]) {
//   return prisma.ipTrack.upsert({
//     create: {
//       ip,
//       profileIds,
//     },
//     update: {
//       profileIds,
//     },
//     where: { ip: ip },
//   })
// }

export async function createIpTrack(ip: string, profileIds: string[]) {
  return prisma.ipTrack.create({
    data: {
      ip,
      profileIds,
    },
  })
}

export async function updateIpTrack(ip: string, profileIds: string[]) {
  return prisma.ipTrack.update({
    data: {
      profileIds,
    },
    where: {
      ip,
    },
  })
}
