import { StateStatus } from '@/app/(profile)/(routes)/moderation/(components)/StateStatus/StateStatus'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import {
  getHourlyRateDisplay,
  jobSpecializationThemes,
} from '@/app/(profile)/profile.helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/profile.mappers'
import PadlockIcon from '@/assets/icons/PadlockIcon'
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
  searchTerm?: string | null
  isHiddenName?: boolean
}

const cx = classNames.bind(styles)

const highlightText = (text: string, searchText?: string | null) => {
  if (!searchText || !searchText.trim()) {
    return text
  }
  const regex = new RegExp(`(${searchText})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          part
        ) : (
          <span key={idx} className={styles.rest}>
            {part}
          </span>
        ),
      )}
    </>
  )
}

const ProfileCard = ({
  data,
  onClick,
  withStateStatus,
  searchTerm,
  isHiddenName = false,
}: ProfileCardProps) => {
  const hourlyRateMin = data.hourlyRateMin
  const hourlyRateMax = data.hourlyRateMax
  const currency = data.currency

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
    <Link
      href={`${AppRoutes.profile}/${data.githubUsername}`}
      onClick={onClick}
      style={specializationTheme}
      className={`${styles.frameWrapper} ${
        withStateStatus && styles.moderationFrame
      }`}
    >
      <div className={styles.frame}>
        <div className={styles.container} data-test-id="profileContainer">
          <div className={styles.profile}>
            <Avatar src={data.avatarUrl || ''} size={78} />
          </div>
          <div className={styles.data}>
            <div className={styles.nameContainer}>
              {!isHiddenName ? (
                <p className={styles.name}>
                  {highlightText(data.fullName, searchTerm)}
                </p>
              ) : (
                <>
                  <p className={styles.name}>
                    {highlightText(data.fullName.slice(0, 1) + '.', searchTerm)}
                  </p>
                  <div className={styles.nameCover}>
                    <PadlockIcon />
                    Login to access
                  </div>
                </>
              )}
            </div>
            <p className={styles.wordWrap}>
              {mapSeniorityLevel(data.seniority)}{' '}
              {mapSpecializationToTitle(data.position)}
            </p>
            <p className={styles.location}>
              {data.country}, {data.city}
              {` - ${mapEmploymentTypes(data.employmentTypes).join(' / ')}`}
              {data.remoteOnly && ' / Remote'}
            </p>
            <p className={styles.salary}>
              {getHourlyRateDisplay(hourlyRateMin, currency, hourlyRateMax)}
            </p>
          </div>
        </div>
        <TechnologiesRenderer data={data} classes={getTechnologyClasses} />
      </div>
      {withStateStatus && (
        <div className={styles.detailsWrapper}>
          <StateStatus profile={data} />
        </div>
      )}
    </Link>
  )
}

export default ProfileCard
