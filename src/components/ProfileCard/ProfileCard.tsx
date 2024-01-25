import React from 'react'
import styles from './ProfileCard.module.scss'
import { ProfileModel } from '@/data/frontend/profile/types'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import Image from 'next/image'
import { JobSpecialization } from '../ProfileList/profile-data'
import classNames from 'classnames/bind'
import { StateStatus } from '../StateStatus/StateStatus'

interface ProfileCardProps {
  onClick?: () => void
  data: ProfileModel
  withStateStatus?: boolean
}

const cx = classNames.bind(styles)

const ProfileCard = ({ data, onClick, withStateStatus }: ProfileCardProps) => {
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
    <div className={styles.frameWrapper}>
      <div
        className={`${styles.frame} ${
          withStateStatus && styles.moderationFrame
        }`}
        onClick={!withStateStatus ? onClick : undefined}
      >
        <div
          className={styles.profileWrapper}
          onClick={withStateStatus ? onClick : undefined}
        >
          <div className={styles.container} data-test-id="profileContainer">
            <div className={styles.profile}>
              <Image
                src={data.avatarUrl || ''}
                width={78}
                height={78}
                alt="user's avatar"
                className={styles.avatar}
              />
            </div>
            <div className={styles.data}>
              <p className={styles.name}>{data.fullName}</p>
              <p className={`${getStackClasses} ${styles.wordWrap}`}>
                {data.seniority} {data.position}&nbsp;Developer
              </p>
              <p className={styles.location}>
                {data.country.name}, {data.city.name}&nbsp;/&nbsp;
                {data.remoteOnly && 'Remote'}
              </p>
            </div>
          </div>
          <TechnologiesRenderer data={data} classes={getTechnologyClasses} />
        </div>
        {withStateStatus && (
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsContent}>
              <StateStatus profile={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
