'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../page.module.scss'

interface HeaderProps {
    jobTitle: string
    jobStatus?: 'PENDING' | 'ACTIVE' | 'CLOSED'
    applicantCount?: number
}

export default function Header({
    jobTitle,
    jobStatus = 'PENDING',
    applicantCount = 0
}: HeaderProps) {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }

    return (
        <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
                <button onClick={handleGoBack} className={styles.backButton}>
                    ← Moje zlecenia
                </button>
                <div className={styles.jobTitleContainer}>
                    <h1 className={styles.jobTitle}>{jobTitle}</h1>
                    <span className={styles.jobStatus}>{jobStatus}</span>
                </div>
                <div className={styles.jobMeta}>
                    <span>Opublikowany 7 dni temu</span>
                    {applicantCount > 0 && (
                        <span className={styles.applicantCountBadge}>
                            {applicantCount} {applicantCount === 1 ? 'applicant' : 'applicants'}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.headerRight}>
                <div className={styles.logoContainer}>
                    <span className={styles.logoText}>GH</span>
                </div>
            </div>
        </div>
    )
} 