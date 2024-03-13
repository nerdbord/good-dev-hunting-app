'use server'

import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { countProfilesForPositionsByFilters } from '@/backend/profile/profile.service'

export const countProfilesForPositions = async (
  filters: Record<JobOfferFiltersEnum, string>,
) => {
  try {
    return await countProfilesForPositionsByFilters(filters)
  } catch (error) {
    throw new Error('Error while counting profiles for positions.')
  }
}
