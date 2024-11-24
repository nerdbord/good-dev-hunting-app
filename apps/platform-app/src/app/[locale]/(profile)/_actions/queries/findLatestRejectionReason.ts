'use server'
import { getProfileById } from '@/backend/profile/profile.service'
import { getRejectionReason } from '@/backend/profile/rejection.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findLatestRejectionReason = cache(
  withSentry(async (profileId: string) => {
    const reason = await getRejectionReason(profileId)
    return reason
  }),
)
