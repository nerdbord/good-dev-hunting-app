import { findProfileById } from '@/app/(profile)/_actions'
import { ProfileModel } from '@/app/(profile)/_models/profile.model'
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
  profileId: string
}
const UserProfileMain = async ({
  children,
  profileId,
}: PropsWithChildren<UserProfileProps>) => {
  const profile = await findProfileById(profileId)
  const mappedProfile = new ProfileModel(profile)
  const countryFlag =
    countries.find((country) => country.name === mappedProfile.country)?.flag ||
    ''

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backBtnMobile}>
          <GoBackButton>Go back</GoBackButton>
        </div>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Avatar src={mappedProfile.avatarUrl || ''} size={100} />
            <div className={styles.name}>{profile.fullName}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />
              {mappedProfile.country}, {mappedProfile.city}
            </div>
            {mappedProfile.openForCountryRelocation && (
              <div className={styles.location}>Open to country relocation</div>
            )}
            {mappedProfile.openForCityRelocation && (
              <div className={styles.location}>Open to city relocation</div>
            )}
            {mappedProfile.remoteOnly && (
              <div className={styles.location}>Remote only</div>
            )}
          </div>
          <div className={styles.addInfoBox}>
            <div className={styles.seniority}>
              {mapSeniorityLevel(profile.seniority)}{' '}
              {mapSpecializationToTitle(mappedProfile.position)}
            </div>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {mapEmploymentTypes(mappedProfile.employmentTypes).join(' / ')}
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
