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
