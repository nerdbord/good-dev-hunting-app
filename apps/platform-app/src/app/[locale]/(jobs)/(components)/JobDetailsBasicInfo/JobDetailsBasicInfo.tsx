import {
  mapEmploymentMode,
  mapJobContract,
} from '@/app/[locale]/(jobs)/_utils/job.mappers'
import {
  BudgetType,
  type EmploymentMode,
  type JobContractType,
} from '@/app/[locale]/(jobs)/_utils/types'
import {
  currencyButtonTextDisplay,
  mapEmploymentType,
} from '@/app/[locale]/(profile)/profile.mappers'
import { countries } from '@/data/countries'
import { I18nNamespaces } from '@/i18n/request'
import {
  PublishingState,
  type Currency,
  type EmploymentType,
} from '@prisma/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
        {job.state === PublishingState.REJECTED && (
          <div className={styles.rejectedStatus}>{t('rejectedStatus')}</div>
        )}
      </div>

      <div className={styles.locationBox}>
        {job.country && (
          <div className={styles.country}>
            <Image
              width={24}
              height={24}
              src={`https://flagsapi.com/${countryFlag}/flat/24.png`}
              alt={`The flag of ${job.country}`}
            />
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

      <div className={styles.addInfo}>
        {t('budget')}:{' '}
        {job.budgetType === BudgetType.REQUEST_QUOTE ||
        (!job.minBudgetForProjectRealisation &&
          !job.maxBudgetForProjectRealisation)
          ? t('budgetRequestQuote')
          : `${job.minBudgetForProjectRealisation} - ${
              job.maxBudgetForProjectRealisation
            } ${currencyButtonTextDisplay(job.currency as Currency)}`}
      </div>
    </div>
  )
}
