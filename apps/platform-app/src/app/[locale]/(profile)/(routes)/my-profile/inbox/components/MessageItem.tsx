'use client'
import { Message } from '../types'
import styles from '../page.module.scss'

interface MessageItemProps {
    message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
    const isCompany = message.sender === 'company'

    return (
        <div
            className={`${styles.messageItem} ${isCompany ? styles.receivedMessage : styles.sentMessage}`}
        >
            <div className={styles.messageContent}>
                {message.content}
            </div>
            <div className={styles.messageTimestamp}>{message.timestamp}</div>
        </div>
    )
} 