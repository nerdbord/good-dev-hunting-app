'use server'

import { type SearchParamsFilters } from '@/app/(profile)/types'
import { countProfilesForPositionsByFilters } from '@/backend/profile/profile.service'

export const countProfilesForPositions = async (
  filters: SearchParamsFilters,
) => {
  try {
    return await countProfilesForPositionsByFilters(filters)
  } catch (error) {
    throw new Error('Error while counting profiles for positions.')
  }
}
