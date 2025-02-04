import {
  mapEmploymentMode,
  mapJobContract,
} from '@/app/[locale]/(jobs)/jobDetails.mappers'
import { type JobContractType } from '@/app/[locale]/(jobs)/jobDetailsTypes'
import {
  currencyButtonTextDisplay,
  mapEmploymentType,
} from '@/app/[locale]/(profile)/profile.mappers'
import { countries } from '@/data/countries'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { mockJobDetails } from '../../mockData'
import styles from './JobDetailsBasicInfo.module.scss'

export const JobDetailsBasicInfo = () => {
  const t = useTranslations(I18nNamespaces.Jobs)

  const countryFlag =
    countries.find((country) => country.name === mockJobDetails.country)
      ?.flag || ''
  return (
    <div className={styles.profile}>
      <div className={styles.user}>
        <p className={styles.name}>{mockJobDetails.jobName}</p>
      </div>

      <div className={styles.locationBox}>
        <div className={styles.country}>
          <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />

          <p>
            {mockJobDetails.country}, {mockJobDetails.city}
          </p>
        </div>

        {mockJobDetails.remoteOnly && (
          <div className={styles.location}>{t('remoteOnly')}</div>
        )}
      </div>

      <div className={styles.addInfoBox}>
        <div className={styles.addInfo}>
          {/* {t('employmentType')}:{' '} */}
          {mockJobDetails.employmentType.map(mapEmploymentType).join(', ')}
        </div>
        <span className={styles.separator}>/</span>
        <div className={styles.addInfo}>
          {/* {t('contractTypeLabel')}:{' '} */}
          {mapJobContract(mockJobDetails.contractType.value as JobContractType)}
        </div>
        <span className={styles.separator}>/</span>
        <div className={styles.addInfo}>
          {/* {t('workMode')}:{' '} */}
          {mockJobDetails.employmentMode.map(mapEmploymentMode).join(', ')}
        </div>
      </div>
      <div className={styles.addInfo}>
        {t('budget')}: {mockJobDetails.minBudgetForProjectRealisation} -{' '}
        {mockJobDetails.maxBudgetForProjectRealisation}{' '}
        {currencyButtonTextDisplay(mockJobDetails.currency)}
      </div>
    </div>
  )
}
