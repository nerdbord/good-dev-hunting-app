import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  getHourlyRateDisplay,
  jobSpecializationThemes,
} from '@/app/[locale]/(profile)/profile.helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/[locale]/(profile)/profile.mappers'
import { Avatar } from '@/components/Avatar/Avatar'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import classNames from 'classnames/bind'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useMemo } from 'react'
import { type UrlObject } from 'url'
import { StateStatus } from '../../(routes)/moderation/(components)/StateStatus/StateStatus'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  onClick?: (e: React.MouseEvent) => void
  data: ProfileModel
  withStateStatus?: boolean
  searchTerm?: string | null
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
  href,
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
      suppressHydrationWarning={true}
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
            <Avatar src={data.avatarUrl || ''} size={78} />
          </div>
          <div className={styles.data}>
            <div className={styles.name}>
              {highlightText(data.fullName, searchTerm)}
            </div>
            <div className={styles.wordWrap}>
              {mapSeniorityLevel(data.seniority)}{' '}
              {mapSpecializationToTitle(data.position)}
            </div>
            <div className={styles.location}>
              {data.country}, {data.city}
              {` - ${mapEmploymentTypes(data.employmentTypes).join(' / ')}`}
              {data.remoteOnly && ' / Remote'}
            </div>
            <div className={styles.salary}>
              {getHourlyRateDisplay(hourlyRateMin, currency, hourlyRateMax)}
            </div>
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

export default dynamic(() => Promise.resolve(ProfileCard), { ssr: false })
