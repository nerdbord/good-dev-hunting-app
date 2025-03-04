import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { EditIcon } from '@gdh/ui-system/icons'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import type { JobPublishingState } from '../../(routes)/jobs/my-jobs/mockData'
import { calculateDaysAgo } from '../../_utils/utils'
import styles from './myJobCard.module.scss'
interface MyJobCardProps {
  job: {
    name: string
    PublishingState: JobPublishingState
    createdDate: string
    id?: string
  }
}

export const MyJobCard = async ({ job }: MyJobCardProps) => {
  const { name, PublishingState, createdDate, id = '123' } = job
  const t = await getTranslations(I18nNamespaces.MyJobCard)

  const renderDate = (createdDate: string) => {
    const daysAgo = calculateDaysAgo(createdDate)
    if (daysAgo === 0) {
      return t('today')
    }
    if (daysAgo === 1) {
      return t('yesterday')
    }
    return `${daysAgo} ${t('days')}`
  }

  return (
    <div className={styles.jobCard}>
      <div className={styles.statusBox}>
        <div className={styles.status}>{PublishingState}</div>
        <p className={styles.date}>
          {`${t('published')} `}
          <span>{renderDate(createdDate)}</span>
        </p>
      </div>
      <h3 className={`${styles.jobCardHeader}`}>{name}</h3>
      <div className={styles.buttonBox}>
        <Link href={AppRoutes.jobApplications.replace(':id', id)}>
          <Button variant="secondary">
            {t('openBtn')}
            <span className={styles.submissionsCounter}>3</span>
          </Button>
        </Link>
        <Link href={AppRoutes.jobEdit.replace(':id', id)}>
          <Button variant="secondary">
            <EditIcon />
          </Button>
        </Link>
      </div>
    </div>
  )
}
