import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { getHourlyRateDisplay } from '@/app/[locale]/(profile)/profile.helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/[locale]/(profile)/profile.mappers'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { findCountryCode, getCountryName } from '@/data/countries'
import { I18nNamespaces } from '@/i18n/request'
import { Avatar } from '@gdh/ui-system'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import styles from './UserProfileMain.module.scss'

type UserProfileProps = {
  profileId: string
}
const UserProfileMain = async ({ profileId }: UserProfileProps) => {
  const profile = await findProfileById(profileId)
  const t = await getTranslations(I18nNamespaces.UserProfile)
  const locale = await getLocale()
  const hourlyRateMin = profile.hourlyRateMin
  const hourlyRateMax = profile.hourlyRateMax
  const currency = profile.currency
  const countryCode = findCountryCode(profile.country)

  return (
    <>
      <div className={styles.backBtnMobile}>
        <GoBackButton>{t('goBack')}</GoBackButton>
      </div>
      <div className={styles.profile}>
        <div className={styles.user}>
          <Avatar src={profile.avatarUrl || ''} size={100} />
          <div className={styles.name}>{profile.fullName}</div>
        </div>
        <div className={styles.locationBox}>
          <div className={styles.country}>
            <Image
              width={24}
              height={24}
              src={`https://flagsapi.com/${countryCode}/flat/24.png`}
              alt={`The flag of ${profile.country}`}
            />
            {getCountryName(profile.country, locale)}, {profile.city}
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
        <p className={styles.salary}>
          {getHourlyRateDisplay(hourlyRateMin, currency, hourlyRateMax)}
        </p>
      </div>
    </>
  )
}

export default UserProfileMain
