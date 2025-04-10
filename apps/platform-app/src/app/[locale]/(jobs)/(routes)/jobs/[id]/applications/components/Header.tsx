'use client'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Logo } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../page.module.scss'

interface HeaderProps {
  jobTitle: string
  jobStatus?: 'PENDING' | 'ACTIVE' | 'CLOSED'
  applicantCount?: number
  daysPublished?: number
}

export default function Header({
  jobTitle,
  jobStatus = 'PENDING',
  applicantCount = 0,
  daysPublished = 7,
}: HeaderProps) {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Applications)

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerLeft}>
        <button onClick={handleGoBack} className={styles.backButton}>
          ← {t('backButton')}
        </button>
        <div className={styles.jobTitleContainer}>
          <h1 className={styles.jobTitle}>{jobTitle}</h1>
          <span className={styles.jobStatus}>{jobStatus}</span>
        </div>
        <div className={styles.jobMeta}>
          <span>{t('publishedDaysAgo', { days: daysPublished })}</span>
          {applicantCount > 0 && (
            <span className={styles.applicantCountBadge}>
              {applicantCount}{' '}
              {applicantCount === 1 ? t('applicant') : t('applicants')}
            </span>
          )}
        </div>
      </div>
      <div className={styles.headerRight}>
        <Link href={AppRoutes.home}>
          <Logo withText={false} withLink={false} />
        </Link>
      </div>
    </div>
  )
}
