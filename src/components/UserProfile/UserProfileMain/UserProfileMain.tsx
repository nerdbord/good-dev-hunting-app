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

const UserProfileMain = ({ user }: { user: ProfileModel }) => {
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
            <div className={styles.name}>{user?.fullName}</div>
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
              {user?.country.name}, {user?.city.name}
            </div>
            {user?.city.openForRelocation && (
              <div className={styles.location}>Open to relocation</div>
            )}
            {user?.remoteOnly && (
              <div className={styles.location}>Remote only</div>
            )}
          </div>
          <div className={styles.addInfoBox}>
            <div className={styles.seniority}>
              {user?.seniority} {user?.position} Developer
            </div>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>{user?.employmentType}</div>
            </div>
          </div>
        </div>{' '}
        <div className={styles.social}>
          <div className={styles.socialItem}>
            Github
            <GithubIcon2 />
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
