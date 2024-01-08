import PolandFlag from '@/assets/images/flagPL.jpg'
import { mapEmploymentType } from '@/data/frontend/profile/mappers'
import { ProfileModel } from '@/data/frontend/profile/types'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import styles from './UserProfileMain.module.scss'

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
          {userProfile.openForCountryRelocation && (
            <div className={styles.location}>Open to country relocation</div>
          )}
          {userProfile.openForCityRelocation && (
            <div className={styles.location}>Open to city relocation</div>
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
