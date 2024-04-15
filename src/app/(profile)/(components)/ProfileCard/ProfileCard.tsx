import {
  jobSpecializationThemes,
  renderRelativeDateLabel,
} from '@/app/(profile)/helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/mappers'
import { StateStatus } from '@/app/(profile)/moderation/(components)/StateStatus/StateStatus'
import { type ProfileModel } from '@/app/(profile)/types'
import { SendIcon } from '@/assets/icons/SendIcon'
import ViewIcon from '@/assets/icons/ViewIcon'
import { Avatar } from '@/components/Avatar/Avatar'
import Tooltip from '@/components/Tooltip/Tooltip'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import { AppRoutes } from '@/utils/routes'
import { type ContactRequest, type ProfileView } from '@prisma/client'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  onClick?: (e: React.MouseEvent) => void
  data: ProfileModel
  withStateStatus?: boolean
  searchTerm?: string | null
  visitedProfile?: ProfileView
  contactedProfile?: ContactRequest
}

const cx = classNames.bind(styles)

const highlightText = (text: string, searchText?: string | null) => {
  if (!searchText || !searchText.trim()) {
    return text
  }
  const regex = new RegExp(`(${searchText})`, 'gi')
  const parts = text.split(regex)

  return (
    <div>
      {parts.map((part, idx) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          part
        ) : (
          <span key={idx} className={styles.rest}>
            {part}
          </span>
        ),
      )}
    </div>
  )
}

const ProfileCard = ({
  data,
  onClick,
  withStateStatus,
  searchTerm,
  contactedProfile,
  visitedProfile,
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

  const getNameClasses = cx({
    [styles.name]: true,
    [styles.active]: contactedProfile || visitedProfile,
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
              <p className={getNameClasses}>
                {highlightText(data.fullName, searchTerm)}
                {visitedProfile && !contactedProfile && (
                  <Tooltip
                    text={`You have visited this profile ${renderRelativeDateLabel(
                      visitedProfile.createdAt,
                    )}`}
                  >
                    <ViewIcon color="#5E28F6" />
                  </Tooltip>
                )}
                {contactedProfile && (
                  <Tooltip
                    text={`You have messaged this profile ${renderRelativeDateLabel(
                      contactedProfile.createdAt,
                    )}`}
                  >
                    <SendIcon color="#5E28F6" />
                  </Tooltip>
                )}
              </p>
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
