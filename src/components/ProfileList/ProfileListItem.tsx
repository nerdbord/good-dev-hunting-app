'use client'
import classNames from 'classnames/bind'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import React from 'react'
import { ProfilePayload } from '@/backend/profile/profile.types'
import { JobSpecialization } from '@/components/ProfileList/profile-data'
import ProfilePicture from '@/assets/images/ProfilePicture.png'

const cx = classNames.bind(styles)

export const ProfileListItem: React.FC<{ data: ProfilePayload }> = ({
  data,
}) => {
  const commonClasses = {
    [styles.frontend]: data.position === JobSpecialization.Frontend,
    [styles.backend]: data.position === JobSpecialization.Backend,
    [styles.fullstack]: data.position === JobSpecialization.Fullstack,
  }

  const getStackClasses = cx(commonClasses)
  const getTechnologyClasses = cx({
    [styles.technology]: true,
    ...commonClasses,
  })

  const renderTechnologies = () => {
    if (data.techStack.length <= 4) {
      return data.techStack.map((tech, index) => (
        <span key={index}>{tech}</span>
      ))
    } else {
      const displayedTechnologies = data.techStack.slice(0, 3)
      const othersCount = data.techStack.length - 3

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
          <p className={styles.name}>{data.fullName}</p>
          <p className={getStackClasses}>
            {data.seniority} {data.position} Developer
          </p>
          <p className={styles.location}>
            {data.country.name}, {data.city.name} / {''}
          </p>
        </div>
      </div>
      <div className={getTechnologyClasses}>{renderTechnologies()}</div>
    </div>
  )
}
