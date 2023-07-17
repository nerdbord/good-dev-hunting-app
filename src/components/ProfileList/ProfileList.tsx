'use client'
import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import {
  ProfileData,
  ProfileListItems,
} from '@/components/ProfileList/ProfileData'
import { useFilters } from '@/contexts/FilterContext'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const ProfileListItem: React.FC<{ data: ProfileListItems }> = ({ data }) => {
  const getStackClasses = cx({
    [styles.frontend]: data.stack === 'Frontend',
    [styles.backend]: data.stack === 'Backend',
    [styles.fullstack]: data.stack === 'Fullstack',
  })
  const getTechnologyClasses = cx({
    [styles.technology]: true,
    [styles.frontend]: data.stack === 'Frontend',
    [styles.backend]: data.stack === 'Backend',
    [styles.fullstack]: data.stack === 'Fullstack',
  })

  const renderTechnologies = () => {
    if (data.technology.length <= 4) {
      return data.technology.map((tech, index) => (
        <span key={index} className={styles.badge}>
          {tech}
        </span>
      ))
    } else {
      const displayedTechnologies = data.technology.slice(0, 3)
      const othersCount = data.technology.length - 3
  
      return (
        <>
          {displayedTechnologies.map((tech, index) => (
            <span key={index} className={styles.badge}>
              {tech}
            </span>
          ))}
          <span className={styles.badge}>{`+ ${othersCount} Others`}</span>
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
            {data.seniority} {data.stack} Developer
          </p>
          <p className={styles.location}>
            {data.country}, {data.city} / {data.remote}
          </p>
          {/* <p>{data.employmentType}</p> */}
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
  const filteredProfileData = ProfileData.filter((profile) => {
    return (
      (!stackFilter || profile.stack === stackFilter) &&
      (!seniorityFilter || profile.seniority === seniorityFilter) &&
      (!locationFilter || profile.country === locationFilter) &&
      (technologyFilter.length === 0 ||
        technologyFilter.every((tech) => profile.technology.includes(tech))) &&
      (!availabilityFilter || profile.employmentType === availabilityFilter)
    )
  })
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