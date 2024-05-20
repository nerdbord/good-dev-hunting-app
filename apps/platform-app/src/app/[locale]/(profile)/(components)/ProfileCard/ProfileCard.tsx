import { StateStatus } from '@/app/[locale]/(profile)/(routes)/moderation/(components)/StateStatus/StateStatus'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import dynamic from 'next/dynamic'

import {
  getHourlyRateDisplay,
  jobSpecializationThemes,
  renderRelativeDateLabel,
} from '@/app/[locale]/(profile)/profile.helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/[locale]/(profile)/profile.mappers'
import PadlockIcon from '@/assets/icons/PadlockIcon'
import { SendIcon } from '@/assets/icons/SendIcon'
import ViewIcon from '@/assets/icons/ViewIcon'
import { Avatar } from '@/components/Avatar/Avatar'
import Tooltip from '@/components/Tooltip/Tooltip'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { useMemo } from 'react'
import { type UrlObject } from 'url'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  onClick?: (e: React.MouseEvent) => void
  data: ProfileModel
  withStateStatus?: boolean
  searchTerm?: string | null
  isHiddenName?: boolean
  visitedDate?: Date
  contactedDate?: Date
  href: string | UrlObject
}

const cx = classNames.bind(styles)

const highlightText = (text: string, searchText?: string | null) => {
  if (!searchText || !searchText.trim()) {
    return text
  }
  const regex = new RegExp(`(${searchText})`, 'gi')
  const parts = text.split(regex)

  return (
    <p>
      {parts.map((part, idx) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          part
        ) : (
          <span key={idx} className={styles.rest}>
            {part}
          </span>
        ),
      )}
    </p>
  )
}

const ProfileCard = ({
  data,
  onClick,
  withStateStatus,
  searchTerm,
  isHiddenName = false,
  href,
  visitedDate,
  contactedDate,
}: ProfileCardProps) => {
  const {
    id,
    fullName,
    avatarUrl,
    seniority,
    position,
    country,
    city,
    employmentTypes,
    remoteOnly,
    hourlyRateMax,
    hourlyRateMin,
    currency,
    state,
  } = data

  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[position],
    }),
    [position],
  )

  const getTechnologyClasses = cx({
    [styles.technology]: true,
  })

  const getNameClasses = cx({
    [styles.name]: true,
    [styles.active]: visitedDate || contactedDate,
  })

  return (
    <Link
      href={href}
      onClick={onClick}
      style={specializationTheme}
      className={`${styles.frameWrapper} ${
        withStateStatus && styles.moderationFrame
      }`}
    >
      <div className={styles.frame}>
        <div className={styles.container} data-test-id="profileContainer">
          <div className={styles.profile}>
            <Avatar src={avatarUrl || ''} size={78} />
          </div>
          <div className={styles.data}>
            <div className={styles.nameContainer}>
              {!isHiddenName ? (
                <div className={getNameClasses}>
                  {highlightText(fullName, searchTerm)}
                  {visitedDate && !contactedDate && (
                    <Tooltip
                      text={`You have visited this profile ${renderRelativeDateLabel(
                        visitedDate,
                      )}`}
                    >
                      <ViewIcon color="#5E28F6" />
                    </Tooltip>
                  )}
                  {contactedDate && (
                    <Tooltip
                      text={`You have messaged this profile ${renderRelativeDateLabel(
                        contactedDate,
                      )}`}
                    >
                      <SendIcon color="#5E28F6" />
                    </Tooltip>
                  )}
                </div>
              ) : (
                <>
                  <p className={styles.name}>
                    {highlightText(fullName.slice(0, 1) + '.', searchTerm)}
                  </p>
                  <div className={styles.nameCover}>
                    <PadlockIcon />
                    Login to access
                  </div>
                </>
              )}
            </div>
            <p className={styles.wordWrap}>
              {mapSeniorityLevel(seniority)}{' '}
              {mapSpecializationToTitle(position)}
            </p>
            <p className={styles.location}>
              {country}, {city}
              {` - ${mapEmploymentTypes(employmentTypes).join(' / ')}`}
              {remoteOnly && ' / Remote'}
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
          <StateStatus profileId={id} profileState={state} />
        </div>
      )}
    </Link>
  )
}

export default dynamic(() => Promise.resolve(ProfileCard), { ssr: false })
