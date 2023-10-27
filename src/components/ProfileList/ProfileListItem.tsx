'use client'
import classNames from 'classnames/bind'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import React from 'react'
import { JobSpecialization } from '@/components/ProfileList/profile-data'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { ProfileModel } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'

const cx = classNames.bind(styles)

export const ProfileListItem: React.FC<{ data: ProfileModel }> = ({ data }) => {
  const router = useRouter()

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
      <TechnologiesRenderer data={data} classes={getTechnologyClasses} />
    </div>
  )
}
