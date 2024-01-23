import { countries } from '@/data/frontend/profile/countries/countries'
import { mapEmploymentType } from '@/data/frontend/profile/mappers'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import styles from './UserProfileMain.module.scss'

type UserProfileProps = {
  userProfile: ProfileModelSimplified
}
const UserProfileMain = ({
  userProfile,
  children,
}: PropsWithChildren<UserProfileProps>) => {
  const countryFlag =
    countries.find((country) => country.name === userProfile.country.name)
      ?.flag || ''

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
            <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />
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
