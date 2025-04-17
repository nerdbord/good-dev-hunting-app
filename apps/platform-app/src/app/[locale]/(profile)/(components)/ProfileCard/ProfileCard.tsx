import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'

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
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import { Avatar, Tooltip } from '@gdh/ui-system'
import { PadlockIcon, SendIcon, ViewIcon } from '@gdh/ui-system/icons'
import classNames from 'classnames/bind'
import { useMemo } from 'react'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  profile: ProfileModel
  searchTerm?: string | null
  isHiddenName?: boolean
  visitedDate?: Date
  contactedDate?: Date
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
  profile,
  searchTerm,
  isHiddenName = false,
  visitedDate,
  contactedDate,
}: ProfileCardProps) => {
  const {
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
    techStack,
  } = profile

  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[position],
    }),
    [position],
  )

  const getNameClasses = cx({
    [styles.name]: true,
    [styles.active]: visitedDate || contactedDate,
  })

  return (
    <div className={styles.frame} style={specializationTheme}>
      <div className={styles.container} data-test-id="profileContainer">
        <Avatar src={avatarUrl} size={78} />
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
            {mapSeniorityLevel(seniority)} {mapSpecializationToTitle(position)}
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
      <TechnologiesRenderer techStack={techStack} color={specializationTheme} />
    </div>
  )
}

export default ProfileCard
