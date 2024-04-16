import { StateStatus } from '@/app/(profile)/(routes)/moderation/(components)/StateStatus/StateStatus'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { jobSpecializationThemes } from '@/app/(profile)/profile.helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/profile.mappers'
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
}: ProfileCardProps) => {
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
        href={`${AppRoutes.profile}/${data.githubUsername}`}
        passHref
      >
        <div className={styles.frame}>
          <div className={styles.container} data-test-id="profileContainer">
            <div className={styles.profile}>
              <Avatar src={data.avatarUrl || ''} size={78} />
            </div>
            <div className={styles.data}>
              <p className={styles.name}>
                {highlightText(data.fullName, searchTerm)}
              </p>
              <p className={styles.wordWrap}>
                {mapSeniorityLevel(data.seniority)}{' '}
                {mapSpecializationToTitle(data.position)}
              </p>
              <p className={styles.location}>
                {data.country}, {data.city}
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
