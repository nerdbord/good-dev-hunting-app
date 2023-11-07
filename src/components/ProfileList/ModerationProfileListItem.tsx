'use client'
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
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { apiClient } from '@/lib/apiClient'
import { useAsyncAction } from '@/hooks/useAsyncAction'

import classNames from 'classnames/bind'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import { useModal } from '@/contexts/ModalContext'
import RejectingReasonModal from '../RejectingReasonModal/RejectingReasonModal'

const cx = classNames.bind(styles)

type StateStatusProps = {
  profile: ProfileModel
}

export function StateStatus({ profile }: StateStatusProps) {
  const { id, state } = profile
  const { addToast } = useToast()
  const { showModal, closeModal } = useModal()
  const { runAsync } = useAsyncAction()

  const handleClose = () => {
    closeModal()
  }

  if (!(state in PublishingState)) return <></>
  if (state === PublishingState.PENDING) {
    return (
      <div className={styles.actions}>
        <Button
          variant="action"
          onClick={() => {
            runAsync(async () => {
              await apiClient.updateProfileState(id, {
                state: PublishingState.APPROVED,
              })
              addToast(
                'Profile accepted and will be visible on the main page within 24h',
                ToastStatus.SUCCESS,
              )
            })
          }}
        >
          Accept
          <AcceptIcon />
        </Button>
        <Button
          variant="action"
          onClick={() => {
            showModal(
              <RejectingReasonModal
                profileId={profile.id}
                onClose={handleClose}
              />,
            )
          }}
        >
          Reject
          <RejectIcon />
        </Button>
      </div>
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
          router.push(`${AppRoutes.dashboardProfile}/${profile.userId}`)
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
          <StateStatus profile={profile} />
        </div>
      </div>
    </div>
  )
}
