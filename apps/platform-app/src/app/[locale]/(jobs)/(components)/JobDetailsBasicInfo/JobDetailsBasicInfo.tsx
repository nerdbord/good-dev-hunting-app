import {
  mapEmploymentMode,
  mapJobContract,
} from '@/app/[locale]/(jobs)/_utils/jobDetails.mappers'
import {
  type EmploymentMode,
  type JobContractType,
} from '@/app/[locale]/(jobs)/_utils/types'
import {
  currencyButtonTextDisplay,
  mapEmploymentType,
} from '@/app/[locale]/(profile)/profile.mappers'
import { countries } from '@/data/countries'
import { I18nNamespaces } from '@/i18n/request'
import { type Currency, type EmploymentType } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { type JobModel } from '../../_models/job.model'
import styles from './JobDetailsBasicInfo.module.scss'

interface JobDetailsBasicInfoProps {
  job: JobModel
}

export const JobDetailsBasicInfo = ({ job }: JobDetailsBasicInfoProps) => {
  const t = useTranslations(I18nNamespaces.Jobs)

  const countryFlag =
    countries.find((country) => country.name === job.country)?.flag || ''

  return (
    <div className={styles.profile}>
      <div className={styles.user}>
        <p className={styles.name}>{job.jobName}</p>
      </div>

      <div className={styles.locationBox}>
        {job.country && (
          <div className={styles.country}>
            <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />
            <p>
              {job.country}
              {job.city ? `, ${job.city}` : ''}
            </p>
          </div>
        )}

        {job.remoteOnly && (
          <div className={styles.location}>{t('remoteOnly')}</div>
        )}
      </div>

      <div className={styles.addInfoBox}>
        {job.employmentTypes?.length > 0 && (
          <>
            <div className={styles.addInfo}>
              {job.employmentTypes
                .map((type) =>
                  mapEmploymentType(type as unknown as EmploymentType),
                )
                .join(', ')}
            </div>
            <span className={styles.separator}>/</span>
          </>
        )}

        {job.contractType && (
          <>
            <div className={styles.addInfo}>
              {mapJobContract(job.contractType as JobContractType)}
            </div>
            <span className={styles.separator}>/</span>
          </>
        )}

        {job.employmentModes?.length > 0 && (
          <div className={styles.addInfo}>
            {job.employmentModes
              .map((mode) =>
                mapEmploymentMode(mode as unknown as EmploymentMode),
              )
              .join(', ')}
          </div>
        )}
      </div>

      {job.minBudgetForProjectRealisation &&
        job.maxBudgetForProjectRealisation && (
          <div className={styles.addInfo}>
            {t('budget')}: {job.minBudgetForProjectRealisation} -{' '}
            {job.maxBudgetForProjectRealisation}{' '}
            {currencyButtonTextDisplay(job.currency as Currency)}
          </div>
        )}
    </div>
  )
}
