'use client'
import classNames from 'classnames/bind'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import React, { useEffect, useState } from 'react'
import { JobSpecialization } from '@/components/ProfileList/profile-data'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { ProfileModel } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'

const cx = classNames.bind(styles)

export const ProfileListItem: React.FC<{ data: ProfileModel }> = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
    const sliceCount = windowWidth <= 768 ? 2 : 3

    if (data.techStack.length <= sliceCount) {
      return data.techStack.map((tech, index) => (
        <span key={index}>{tech}</span>
      ))
    } else {
      const displayedTechnologies = data.techStack.slice(0, sliceCount)
      const othersCount = data.techStack.length - sliceCount
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
    <div
      className={styles.frame}
      onClick={() => router.push(`${AppRoutes.userProfile}/${data.userId}`)}
    >
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
            {data.country.name}, {data.city.name} /{' '}
            {data.remoteOnly && 'Remote'}
          </p>
        </div>
      </div>
      <div className={getTechnologyClasses}>{renderTechnologies()}</div>
    </div>
  )
}
