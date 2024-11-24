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

export async function getRejectionReason(id: string) {
  const reason = await prisma.rejectionReason.findFirst()

  return reason;
}
