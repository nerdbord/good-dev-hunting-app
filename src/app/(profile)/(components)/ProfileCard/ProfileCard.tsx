import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/mappers'
import { StateStatus } from '@/app/(profile)/moderation/(components)/StateStatus/StateStatus'
import { ProfileModel } from '@/app/(profile)/types'
import { Avatar } from '@/components/Avatar/Avatar'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import { AppRoutes } from '@/utils/routes'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  onClick?: (e: React.MouseEvent) => void
  data: ProfileModel
  withStateStatus?: boolean
}

const cx = classNames.bind(styles)

const ProfileCard = ({ data, withStateStatus, onClick }: ProfileCardProps) => {
  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[data.position],
    }),
    [data.position],
  )

  const getTechnologyClasses = cx({
    [styles.technology]: true,
  })
  return (
    <div
      style={specializationTheme}
      className={`${styles.frameWrapper} ${
        withStateStatus && styles.moderationFrame
      }`}
    >
      <Link
        onClick={onClick}
        href={`${AppRoutes.profiles}/${data.githubUsername}`}
        passHref
      >
        <div className={styles.frame}>
          <div className={styles.container} data-test-id="profileContainer">
            <div className={styles.profile}>
              <Avatar src={data.avatarUrl || ''} size={78} />
            </div>
            <div className={styles.data}>
              <p className={styles.name}>{data.fullName}</p>
              <p className={styles.wordWrap}>
                {mapSeniorityLevel(data.seniority)}{' '}
                {mapSpecializationToTitle(data.position)}
              </p>
              <p className={styles.location}>
                {data.country.name}, {data.city.name}
                {` - ${mapEmploymentTypes(data.employmentTypes).join(' / ')}`}
                {data.remoteOnly && ' / Remote'}
              </p>
            </div>
          </div>
          <TechnologiesRenderer data={data} classes={getTechnologyClasses} />
        </div>
      </Link>
      {withStateStatus && (
        <div className={styles.detailsWrapper}>
          <StateStatus profile={data} />
        </div>
      )}
    </div>
  )
}

export default ProfileCard
