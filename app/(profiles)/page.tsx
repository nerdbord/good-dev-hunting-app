import React from 'react'
import styles from './page.module.scss'
import classNames from 'classnames/bind'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import { Button } from '@/components/Button/Button'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import Image from 'next/image'
import {
  profileData,
  JobSpecialization,
} from '@/components/ProfileList/profile-data'

const Page: React.FC = () => {
  const getJobSpecializationClass = (jobSpecialization: JobSpecialization) => {
    return cx({
      [styles.frontend]: jobSpecialization === JobSpecialization.Frontend,
      [styles.backend]: jobSpecialization === JobSpecialization.Backend,
      [styles.fullstack]: jobSpecialization === JobSpecialization.Fullstack,
    })
  }

  if (!profileData || profileData.length === 0) {
    return <div>No data available</div>
  }

  const cx = classNames.bind(styles)

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>Let your next</span>
          <span>employer find you</span>
        </div>
        <div className={styles.subtitle}>
          Open sourced, free, hub for software developers to be present and
          ready for next commission work.
        </div>
        <div className={styles.buttons}>
          <CreateProfileBtn />
          <Button variant={'secondary'}>Find talents</Button>
        </div>
      </div>

      {profileData.map((profile) => (
        <div key={profile.id} className={styles.right}>
          <div className={styles.frame}>
            <div className={styles.container}>
              <div className={styles.profile}>
                <Image src={ProfilePicture} alt="Profile Picture" />
              </div>
              <div className={styles.data}>
                <p className={styles.name}>{profile.name}</p>
                <p
                  className={getJobSpecializationClass(
                    profile.jobSpecialization,
                  )}
                >
                  {profile.seniority} {profile.jobSpecialization} Developer
                </p>
                <p className={styles.location}>
                  {profile.country}, {profile.city} / {profile.remote}
                </p>
              </div>
            </div>
            <div className={styles.technology}>
              {profile.technology.map((tech) => (
                <span
                  key={tech}
                  className={getJobSpecializationClass(
                    profile.jobSpecialization,
                  )}
                >
                  {tech}
                </span>
              ))}
              <span
                className={getJobSpecializationClass(profile.jobSpecialization)}
              >
                {profile.others}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Page
