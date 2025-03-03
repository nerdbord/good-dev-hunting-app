'use client'
import { Applicant } from '../types'
import styles from '../page.module.scss'

interface ApplicantItemProps {
    applicant: Applicant
    isSelected: boolean
    onClick: () => void
}

export default function ApplicantItem({ applicant, isSelected, onClick }: ApplicantItemProps) {
    return (
        <div
            className={`${styles.applicantItem} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <div className={styles.applicantAvatar}>
                <div className={styles.avatarPlaceholder}></div>
            </div>
            <div className={styles.applicantInfo}>
                <div className={styles.applicantName}>{applicant.name}</div>
                <div className={styles.applicantTitle}>{applicant.title}</div>
                <div className={styles.lastMessage}>
                    <span className={styles.messagePreview}>{applicant.lastMessage}</span>
                    <span className={styles.messageTime}>{applicant.lastMessageTime}</span>
                </div>
            </div>
        </div>
    )
} 