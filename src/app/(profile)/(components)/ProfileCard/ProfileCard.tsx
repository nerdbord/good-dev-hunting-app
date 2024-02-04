import { mapSeniorityLevel } from '@/app/(profile)/mappers'
import { StateStatus } from '@/app/(profile)/moderation/(components)/StateStatus/StateStatus'
import { JobSpecialization, ProfileModel } from '@/app/(profile)/types'
import TechnologiesRenderer from '@/components/renderers/TechnologiesRenderer'
import classNames from 'classnames/bind'
import Image from 'next/image'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  onClick?: () => void
  data: ProfileModel
  withStateStatus?: boolean
}

const cx = classNames.bind(styles)

const ProfileCard = ({ data, onClick, withStateStatus }: ProfileCardProps) => {
  const commonClasses = {
    [styles.frontend]: data.position === JobSpecialization.Frontend,
    [styles.backend]: data.position === JobSpecialization.Backend,
    [styles.fullstack]: data.position === JobSpecialization.Fullstack,
  }

  const getStackClasses = cx(commonClasses)
  const getTechnologyClasses = cx({
    [styles.technology]: true,
    ...commonClasses,
  })
  return (
    <div
      className={`${styles.frameWrapper} ${
        withStateStatus && styles.moderationFrame
      }`}
    >
      <div className={styles.frame} onClick={onClick}>
        <div className={styles.container} data-test-id="profileContainer">
          <div className={styles.profile}>
            <Image
              src={data.avatarUrl || ''}
              width={78}
              height={78}
              alt="user's avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.data}>
            <p className={styles.name}>{data.fullName}</p>
            <p className={`${getStackClasses} ${styles.wordWrap}`}>
              {mapSeniorityLevel(data.seniority)} {data.position}&nbsp;Developer
            </p>
            <p className={styles.location}>
              {data.country.name}, {data.city.name}
              {data.remoteOnly && ' / Remote'}
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
    </div>
  )
}

export default ProfileCard
