'use client'
import classNames from 'classnames/bind'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import React from 'react'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { ProfileModel } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { Button } from '../Button/Button'
import { PublishingState } from '@prisma/client'
import { formatStateName } from '../FilterTabs/Tab'
import { JobSpecialization } from '@/components/ProfileList/profile-data'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import AcceptIcon from '@/assets/icons/AcceptIcon'
import RejectIcon from '@/assets/icons/RejectIcon'

const cx = classNames.bind(styles)

const stateStatus = (state: string): React.ReactNode => {
  if (!(state in PublishingState)) return <></>
  if (state === PublishingState.PENDING) {
    return (
      <>
        <Button variant="action">
          Accept
          <AcceptIcon />
        </Button>
        <Button variant="action">
          Reject
          <RejectIcon />
        </Button>
      </>
    )
  }

  const formattedName = formatStateName(state)
  return (
    <div
      className={cx({
        [styles.stateStatus]: true,
        [styles.stateAccepted]: state === PublishingState.APPROVED,
        [styles.stateRejected]: state === PublishingState.REJECTED,
      })}
    >
      {formattedName}
    </div>
  )
}

export const ModerationProfileListItem: React.FC<{ profile: ProfileModel }> = ({
  profile,
}) => {
  const router = useRouter()

  const commonClasses = {
    [styles.frontend]: profile.position === JobSpecialization.Frontend,
    [styles.backend]: profile.position === JobSpecialization.Backend,
    [styles.fullstack]: profile.position === JobSpecialization.Fullstack,
  }

  const getStackClasses = cx(commonClasses)
  const getTechnologyClasses = cx({
    [styles.technology]: true,
    ...commonClasses,
  })

  return (
    <div className={`${styles.frame} ${styles.moderationFrame}`}>
      <div
        className={styles.container}
        onClick={() =>
          router.push(`${AppRoutes.userProfile}/${profile.userId}`)
        }
      >
        <div className={styles.profile}>
          <img src={ProfilePicture.src} alt="Profile Picture" />
        </div>
        <div className={styles.data}>
          <p className={styles.name}>{profile.fullName}</p>
          <p className={getStackClasses}>
            {profile.seniority} {profile.position} Developer
          </p>
          <p className={styles.location}>
            {profile.country.name}, {profile.city.name} /{' '}
            {profile.remoteOnly && 'Remote'}
          </p>
        </div>
      </div>
      <TechnologiesRenderer data={profile} classes={getTechnologyClasses} />
      <div className={styles.detailsWrapper}>
        <div className={styles.detailsContent}>
          {stateStatus(profile.state)}
        </div>
      </div>
    </div>
  )
}
