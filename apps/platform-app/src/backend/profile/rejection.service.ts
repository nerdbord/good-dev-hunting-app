import { prisma } from '@/lib/prismaClient'

export async function saveRejectingReason(profileId: string, reason: string) {
  const createdReason = await prisma.rejectionReason.create({
    data: {
      profileId,
      reason,
    },
  })
  return createdReason
}

export async function deleteRejectingReason(id: string) {
  await prisma.rejectionReason.delete({
    where: {
      id,
    },
  })
}

export async function getLatestRejectionReason(profileId: string) {
  const reason = await prisma.rejectionReason.findMany({
    where: {
      profileId: profileId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  })

  return reason[0].reason
}
