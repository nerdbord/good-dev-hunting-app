'use client'
import { JobNegotiation } from '../types'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styles from '../page.module.scss'
import chatStyles from '@/components/Chat/chat.module.scss'
import { I18nNamespaces } from '@/i18n/request'

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
                <Link href="#" className={styles.viewJobButton}>
                    {t('viewJob')}
                </Link>
            </div>
        </div>
    )
} 