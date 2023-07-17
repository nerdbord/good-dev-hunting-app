'use client'
import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import {
  profileData,
  ProfileListItems,
  JobSpecialization,
} from '@/components/ProfileList/profile-data'
import { useFilters } from '@/contexts/FilterContext'
import {
  filterByStack,
  filterBySeniority,
  filterByLocation,
  filterByTechnology,
  filterByAvailability,
} from './filters'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

export const ProfileListItem: React.FC<{ data: ProfileListItems }> = ({
  data,
}) => {
  const commonClasses = {
    [styles.frontend]: data.jobSpecialization === JobSpecialization.Frontend,
    [styles.backend]: data.jobSpecialization === JobSpecialization.Backend,
    [styles.fullstack]: data.jobSpecialization === JobSpecialization.Fullstack,
  }

  const getStackClasses = cx(commonClasses)
  const getTechnologyClasses = cx({
    [styles.technology]: true,
    ...commonClasses,
  })

  const renderTechnologies = () => {
    if (data.technology.length <= 4) {
      return data.technology.map((tech, index) => (
        <span key={index}>{tech}</span>
      ))
    } else {
      const displayedTechnologies = data.technology.slice(0, 3)
      const othersCount = data.technology.length - 3

      return (
        <>
          {displayedTechnologies.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
          <span>{`+ ${othersCount} Others`}</span>
        </>
      )
    }
  }

  return (
    <div className={styles.frame}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src={ProfilePicture.src} alt="Profile Picture" />
        </div>
        <div className={styles.data}>
          <p className={styles.name}>{data.name}</p>
          <p className={getStackClasses}>
            {data.seniority} {data.jobSpecialization} Developer
          </p>
          <p className={styles.location}>
            {data.country}, {data.city} / {data.remote}
          </p>
        </div>
      </div>
      <div className={getTechnologyClasses}>{renderTechnologies()}</div>
    </div>
  )
}

const ProfileList: React.FC = () => {
  const {
    stackFilter,
    technologyFilter,
    seniorityFilter,
    availabilityFilter,
    locationFilter,
  } = useFilters()

  const filteredProfileData = profileData
    .filter(filterByStack(stackFilter))
    .filter(filterBySeniority(seniorityFilter))
    .filter(filterByLocation(locationFilter))
    .filter(filterByTechnology(technologyFilter))
    .filter(filterByAvailability(availabilityFilter))

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>Profiles found</div>
      <div className={styles.profileListCont}>
        {filteredProfileData.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}

export default ProfileList
