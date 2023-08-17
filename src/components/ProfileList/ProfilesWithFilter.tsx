'use client'
import React from 'react'
import { useFilters } from '@/contexts/FilterContext'
import {
  filterByPosition,
  filterBySeniority,
  filterByLocation,
  filterByTechnology,
  filterByAvailability,
} from './filters'
import { ProfilePayload } from '@/backend/profile/profile.types'
import { ProfileListItem } from '@/components/ProfileList/ProfileListItem'

export const ProfilesWithFilter: React.FC<{ data: ProfilePayload[] }> = ({
  data = [],
}) => {
  const {
    technologyFilter,
    seniorityFilter,
    availabilityFilter,
    locationFilter,
    jobSpecializationFilter,
  } = useFilters()

  const filteredProfileData = (data || [])
    .filter(filterByPosition(jobSpecializationFilter))
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
