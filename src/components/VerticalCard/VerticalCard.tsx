import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { mapSeniorityLevel } from '@/data/frontend/profile/mappers'
import { JobSpecialization, ProfileModel } from '@/data/frontend/profile/types'
import classNames from 'classnames/bind'
import Image from 'next/image'
import styles from './VerticalCard.module.scss'

const cx = classNames.bind(styles)

const VerticalCard = ({ profile }: { profile?: ProfileModel }) => {
  const commonClasses = {
    [styles.frontend]: profile?.position === JobSpecialization.Frontend,
    [styles.backend]: profile?.position === JobSpecialization.Backend,
    [styles.fullstack]: profile?.position === JobSpecialization.Fullstack,
  }

  const getStackClasses = cx(commonClasses)
  const getTechnologyClasses = cx({
    [styles.technology]: true,
    ...commonClasses,
  })
  return (
    <div className={styles.card}>
      <Image
        width={120}
        height={120}
        src={ProfilePicture}
        alt="Profile Picture"
        className={styles.avatar}
      />
      <div className={styles.person}>
        <h4 className={styles.name}>
          {profile?.fullName || 'Karolina Morwińska'}
        </h4>
        <div className={styles.position}>
          {profile?.seniority
            ? mapSeniorityLevel(profile?.seniority)
            : 'Senior'}{' '}
          {profile?.position || 'Fullstack Developer'}
        </div>
        <div className={styles.location}>
          {profile?.country.name || 'Poland'}, {profile?.city.name || 'Warsaw'}{' '}
          {profile?.remoteOnly && '/ Remote'}
        </div>
      </div>
      <div className={styles.techStack}>
        {profile?.techStack.map((tech, index) => {
          if (index < 4) {
            return (
              <p className={styles.tech}>
                {index < 3
                  ? tech.name
                  : `+ ${profile.techStack.length - index} more`}
              </p>
            )
          }
        }) || (
          <>
            <p className={styles.tech}>Javascript</p>
            <p className={styles.tech}>React.js</p>
            <p className={styles.tech}>Vue.js</p>
            <p className={styles.tech}>+5 more</p>
          </>
        )}
      </div>
      <div className={styles.availability}>
        {/* Dotsy dostosować pod part time/full time/contract ? Jak tutaj wyświetlać */}
        <div className={styles.dot}></div>
        {profile?.employmentTypes ? '' : 'Available for full-time'}
      </div>
    </div>
  )
}

export default VerticalCard
