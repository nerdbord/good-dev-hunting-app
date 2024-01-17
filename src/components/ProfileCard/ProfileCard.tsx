import React from 'react'
import styles from './ProfileCard.module.scss'
import { ProfileModel } from '@/data/frontend/profile/types'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import Image from 'next/image'
import { JobSpecialization } from '../ProfileList/profile-data'
import classNames from 'classnames/bind'

interface ProfileCardProps {
  onClick?: () => void
  data: ProfileModel
}

const cx = classNames.bind(styles)

const ProfileCard = ({ data, onClick }: ProfileCardProps) => {
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
    <>
      <div className={styles.frame} onClick={onClick}>
        <div className={styles.container} data-test-id="profileContainer">
          <div className={styles.profile}>
            <Image
              src={data.avatarUrl || ''}
              width={78}
              height={78}
              alt="user's avatar"
              className={styles.avatar}
            />{' '}
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
    </>
  )
}

export default ProfileCard
