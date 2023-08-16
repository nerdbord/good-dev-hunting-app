'use client'
import { useFilters } from '@/contexts/FilterContext'
import {
  filterByPosition,
  filterBySeniority,
  filterByLocation,
  filterByTechnology,
  filterByAvailability,
} from './filters'
import { ProfileWithRelations } from '@/backend/profile/profile.types'
import React from 'react'
import { ProfileListItem } from '@/components/ProfileList/ProfileList'

export const ProfilesWithFilter: React.FC<{ data: ProfileWithRelations[] }> = ({
  data = [],
}) => {
  const {
    positionFilter,
    technologyFilter,
    seniorityFilter,
    availabilityFilter,
    locationFilter,
  } = useFilters()

  const filteredProfileData = (data || [])
    .filter(filterByPosition(positionFilter))
    .filter(filterBySeniority(seniorityFilter))
    .filter(filterByLocation(locationFilter))
    .filter(filterByTechnology(technologyFilter))
    .filter(filterByAvailability(availabilityFilter))

  return (
    <div>
      {filteredProfileData.map((profile) => (
        <ProfileListItem key={profile.id} data={profile} />
      ))}
    </div>
  )
}
export default ProfilesWithFilter
