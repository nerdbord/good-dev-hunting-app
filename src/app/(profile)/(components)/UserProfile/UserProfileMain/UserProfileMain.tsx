import { mapEmploymentTypes, mapSeniorityLevel } from '@/app/(profile)/mappers'
import { ProfileModel } from '@/app/(profile)/types'
import { countries } from '@/data/countries'
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
            {mapSeniorityLevel(userProfile.seniority)} {userProfile.position}{' '}
            Developer
          </div>
          <div className={styles.addInfo}>
            <div className={styles.addInfoItem}>
              {mapEmploymentTypes(userProfile.employmentTypes)}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default UserProfileMain
