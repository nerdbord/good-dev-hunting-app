'use client'
import { ProfileModel } from '@/app/(profile)/types'
import { useFilters } from '@/contexts/FilterContext'
import React from 'react'
import { ProfileListItem } from '../ProfileList/ProfileListItem'

import styles from './ProfileList.module.scss'

export const ProfilesWithFilter: React.FC<{
  data: ProfileModel[]
}> = ({ data = [] }) => {
  const {
    technologyFilter,
    seniorityFilter,
    availabilityFilter,
    locationFilter,
    jobSpecializationFilter,
  } = useFilters()
  // const filteredProfileData = (data || [])
  //   .filter(filterByPosition(jobSpecializationFilter))
  //   .filter(filterBySeniority(seniorityFilter))
  //   .filter(filterByLocation(locationFilter))
  //   .filter(filterByTechnology(technologyFilter))
  //   .filter(filterByAvailability(availabilityFilter))

  return (
    <div className={styles.profileCards}>
      <div className={styles.profileListCont}>
        {data.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}
export default ProfilesWithFilter
