'use client'
import { JobNegotiation } from '../types'
import styles from '../page.module.scss'

interface NegotiationItemProps {
    negotiation: JobNegotiation
    isSelected: boolean
    onClick: () => void
}

export default function NegotiationItem({ negotiation, isSelected, onClick }: NegotiationItemProps) {
    return (
        <div
            className={`${styles.negotiationItem} ${isSelected ? styles.selected : ''} ${negotiation.unread ? styles.unread : ''}`}
            onClick={onClick}
        >
            <div className={styles.negotiationInfo}>
                <div className={styles.negotiationTitle}>{negotiation.jobTitle}</div>
                <div className={styles.companyName}>{negotiation.companyName}</div>
                <div className={styles.lastMessage}>
                    <span className={styles.messagePreview}>{negotiation.lastMessage}</span>
                    <span className={styles.messageTime}>{negotiation.lastMessageTime}</span>
                </div>
            </div>
        </div>
    )
} 