'use client'
import chatStyles from '@/components/Chat/chat.module.scss'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import styles from '../page.module.scss'
import type { JobNegotiation } from '../types'

interface HeaderProps {
  negotiation: JobNegotiation
}

export default function Header({ negotiation }: HeaderProps) {
  const t = useTranslations(I18nNamespaces.Inbox)

  return (
    <div className={styles.chatHeader}>
      <div>
        <div className={styles.jobTitle}>{negotiation.jobTitle}</div>
        <div className={styles.companyName}>{negotiation.companyName}</div>
      </div>
      <div className={`${styles.headerActions} ${chatStyles.headerActions}`}>
        <Link
          href={`${AppRoutes.jobs}/${negotiation.jobId}`}
          className={styles.viewJobButton}
        >
          {t('viewJob')}
        </Link>
      </div>
    </div>
  )
}
