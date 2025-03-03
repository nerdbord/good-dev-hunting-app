'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from '../page.module.scss'

interface ChatInputProps {
    onSendMessage: (message: string) => void
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [messageInput, setMessageInput] = useState('')
    const t = useTranslations('Inbox')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageInput.trim()) return

        onSendMessage(messageInput)
        setMessageInput('')
    }

    return (
        <form className={styles.messageInputContainer} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.messageInput}
                placeholder={t('typeMessage')}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit" className={styles.sendButton}>
                {t('sendMessage')}
            </button>
        </form>
    )
} 