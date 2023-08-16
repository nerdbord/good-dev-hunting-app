import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { JobSpecialization } from '@/components/ProfileList/profile-data'
import classNames from 'classnames/bind'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import { ProfileWithRelations } from '@/backend/profile/profile.types'
import ProfilesWithFilter from '@/components/ProfileList/ProfilesWithFilter'

const cx = classNames.bind(styles)

export const ProfileListItem: React.FC<{ data: ProfileWithRelations }> = ({
  data,
}) => {
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

  const renderTechnologies = () => {
    if (data.techStack.length <= 4) {
      return data.techStack.map((tech, index) => (
        <span key={index}>{tech}</span>
      ))
    } else {
      const displayedTechnologies = data.techStack.slice(0, 3)
      const othersCount = data.techStack.length - 3

      return (
        <>
          {displayedTechnologies.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
          <span>{`+ ${othersCount} Others`}</span>
        </>
      )
    }
  }

  return (
    <div className={styles.frame}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src={ProfilePicture.src} alt="Profile Picture" />
        </div>
        <div className={styles.data}>
          <p className={styles.name}>{data.fullName}</p>
          <p className={getStackClasses}>
            {data.seniority} {data.position} Developer
          </p>
          <p className={styles.location}>
            {data.country.name}, {data.city.name} / {''}
          </p>
        </div>
      </div>
      <div className={getTechnologyClasses}>{renderTechnologies()}</div>
    </div>
  )
}

const ProfileList = async () => {
  const profiles = await getPublishedProfilesPayload()
  console.log('profile', profiles)

  const filteredCount = profiles.length

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>Profiles found ({filteredCount})</div>
      <div className={styles.profileListCont}>
        {profiles.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
        <ProfilesWithFilter data={profile} />
      </div>
    </div>
  )
}
export default ProfileList
