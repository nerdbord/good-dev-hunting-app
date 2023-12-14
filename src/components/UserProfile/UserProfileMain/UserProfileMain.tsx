import React, { PropsWithChildren } from 'react'
import styles from './UserProfileMain.module.scss'
import Image from 'next/image'
import PolandFlag from '@/assets/images/🇵🇱.jpg'
import { ProfileModel } from '@/data/frontend/profile/types'
import { mapEmploymentType } from '@/data/frontend/profile/mappers'

type UserProfileProps = {
  userProfile: ProfileModel
}
const UserProfileMain = ({
  userProfile,
  children,
}: PropsWithChildren<UserProfileProps>) => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.user}>
          <Image
            src={userProfile.avatarUrl || ''}
            width={100}
            height={100}
            alt="user's avatar"
            className={styles.avatar}
          />
          <div className={styles.name}>{userProfile.fullName}</div>
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
            {userProfile.country.name}, {userProfile.city.name}
          </div>
          {userProfile.city.openForRelocation && (
            <div className={styles.location}>Open to relocation</div>
          )}
          {userProfile.remoteOnly && (
            <div className={styles.location}>Remote only</div>
          )}
        </div>
        <div className={styles.addInfoBox}>
          <div className={styles.seniority}>
            {userProfile.seniority} {userProfile.position} Developer
          </div>
          <div className={styles.addInfo}>
            <div className={styles.addInfoItem}>
              {mapEmploymentType(userProfile.employmentType)}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default UserProfileMain
