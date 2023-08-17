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
import styles from '@/components/ProfileList/ProfileList.module.scss'

export const ProfilesWithFilter: React.FC<{
  data: ProfilePayload[]
  onFilterUpdate?: (filteredCount: number) => void
}> = ({ data = [], onFilterUpdate }) => {
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

  const filteredCount = filteredProfileData.length

  return (
    <div>
      <div className={styles.title}>Profiles found ({filteredCount})</div>
      <div className={styles.profileListCont}>
        {filteredProfileData.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}
export default ProfilesWithFilter
