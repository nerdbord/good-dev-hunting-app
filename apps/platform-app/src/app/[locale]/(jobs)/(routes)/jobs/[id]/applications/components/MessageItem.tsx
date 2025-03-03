'use client'
import { Message } from '../types'
import styles from '../page.module.scss'

interface MessageItemProps {
    message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
    const isRecruiter = message.sender === 'recruiter'

    return (
        <div
            className={`${styles.messageItem} ${isRecruiter ? styles.sentMessage : styles.receivedMessage}`}
        >
            <div className={styles.messageContent}>
                {message.content}
            </div>
            <div className={styles.messageTimestamp}>{message.timestamp}</div>
        </div>
    )
} 