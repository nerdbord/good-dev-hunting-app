import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { EditIcon } from '@gdh/ui-system/icons'
import { type PublishingState } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { calculateDaysAgo } from '../../_utils/utils'
import styles from './MyJobCard.module.scss'

interface MyJobCardProps {
  name: string
  JobPublishingState: PublishingState
  createdAt: string
  id: string
  applications?: number
}

export const MyJobCard = async ({
  name,
  JobPublishingState,
  createdAt,
  id,
  applications = 0,
}: MyJobCardProps) => {
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
        <div className={styles.status}>{JobPublishingState}</div>
        <p className={styles.date}>
          {`${t('published')} `}
          <span>{renderDate(createdAt)}</span>
        </p>
      </div>
      <h3 className={`${styles.jobCardHeader}`}>{name}</h3>
      <div className={styles.buttonBox}>
        <Link href={AppRoutes.jobApplications.replace(':id', id)}>
          <Button variant="secondary">
            {t('openBtn')}
            <span className={styles.submissionsCounter}>{applications}</span>
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
