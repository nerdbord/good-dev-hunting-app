import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/profile.mappers'
import { Avatar } from '@/components/Avatar/Avatar'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { countries } from '@/data/countries'
import { type PropsWithChildren } from 'react'
import styles from './UserProfileMain.module.scss'

type UserProfileProps = {
  profile: ProfileModel
}
const UserProfileMain = ({
  children,
  profile,
}: PropsWithChildren<UserProfileProps>) => {
  const countryFlag =
    countries.find((country) => country.name === profile.country)?.flag || ''

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backBtnMobile}>
          <GoBackButton>Go back</GoBackButton>
        </div>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Avatar src={profile.avatarUrl || ''} size={100} />
            <div className={styles.name}>{profile.fullName}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />
              {profile.country}, {profile.city}
            </div>
            {profile.openForCountryRelocation && (
              <div className={styles.location}>Open to country relocation</div>
            )}
            {profile.openForCityRelocation && (
              <div className={styles.location}>Open to city relocation</div>
            )}
            {profile.remoteOnly && (
              <div className={styles.location}>Remote only</div>
            )}
          </div>
          <div className={styles.addInfoBox}>
            <div className={styles.seniority}>
              {mapSeniorityLevel(profile.seniority)}{' '}
              {mapSpecializationToTitle(profile.position)}
            </div>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {mapEmploymentTypes(profile.employmentTypes).join(' / ')}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default UserProfileMain
