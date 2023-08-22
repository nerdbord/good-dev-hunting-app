import { Prisma } from '@prisma/client'

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    user: true
    country: true
    city: true
  }
}>
