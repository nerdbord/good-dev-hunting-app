import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/mappers'
import { StateStatus } from '@/app/(profile)/moderation/(components)/StateStatus/StateStatus'
import { type ProfileModel } from '@/app/(profile)/types'
import ViewIcon from '@/assets/icons/ViewIcon'
import { Avatar } from '@/components/Avatar/Avatar'
import Tooltip from '@/components/Tooltip/Tooltip'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import { AppRoutes } from '@/utils/routes'
import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'
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
  const { data: session } = useSession()
  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[data.position],
    }),
    [data.position],
  )

  const getTechnologyClasses = cx({
    [styles.technology]: true,
  })

  const isVisited = data.profileViews?.some(
    (view) => view.viewerId === session?.user?.id,
  )

  // const isContacted = data.contactRequests?.some(
  //   (contact) => contact.senderEmail === session?.user?.email,
  // )

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
              <p className={`${styles.name}`}>
                {highlightText(data.fullName, searchTerm)}
                {isVisited && (
                  <Tooltip text="You have visited this profile today">
                    <ViewIcon color="#5E28F6" />
                  </Tooltip>
                )}
                {/* {isContacted && (
                  <Tooltip text="You have messaged this profile today">
                    <SendIcon color="#5E28F6" />
                  </Tooltip>
                )} */}
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
