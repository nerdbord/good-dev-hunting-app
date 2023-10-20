import React from 'react'
import styles from './UserProfileMain.module.scss'
import Image from 'next/image'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import EmailIcon from '@/assets/icons/EmailIcon'
import LinkedIn from '@/assets/icons/LinkedIn'
import PolandFlag from '@/assets/images/🇵🇱.jpg'
import ProfilePicture from '../../../assets/images/ProfilePicture.png'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { ProfileModel } from '@/data/frontend/profile/types'
import { mapEmploymentType } from '@/utils/mapEmploymentType'

const UserProfileMain = ({ userProfile }: { userProfile: ProfileModel }) => {
  return (
    <>
      <div className={styles.container}>
        <GoBackButton>Go back</GoBackButton>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Image
              src={ProfilePicture}
              width={100}
              height={100}
              alt="user's avatar"
              className={styles.avatar}
            />
            <div className={styles.name}>{userProfile?.fullName}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <Image
                src={PolandFlag}
                alt="Poland Flag"
                width={20}
                height={20}
                className={styles.flag}
              />
              {userProfile?.country.name}, {userProfile?.city.name}
            </div>
            {userProfile?.city.openForRelocation && (
              <div className={styles.location}>Open to relocation</div>
            )}
            {userProfile?.remoteOnly && (
              <div className={styles.location}>Remote only</div>
            )}
          </div>
          <div className={styles.addInfoBox}>
            <div className={styles.seniority}>
              {userProfile?.seniority} {userProfile?.position} Developer
            </div>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {mapEmploymentType(userProfile?.employmentType)}
              </div>
            </div>
          </div>
        </div>{' '}
        <div className={styles.social}>
          <div className={styles.socialItem}>
            <a
              href={`https://github.com/${userProfile?.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
              <GithubIcon2 />
            </a>
          </div>
          <div className={styles.socialItem}>
            LinkedIn
            <LinkedIn />
          </div>
          <div className={styles.socialItem}>
            Copy email
            <EmailIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfileMain
