'use client'
import { useState } from 'react'
import styles from '../page.module.scss'

interface ChatInputProps {
    onSendMessage: (message: string) => void
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [messageInput, setMessageInput] = useState('')

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
                placeholder="Message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit" className={styles.sendButton}>
                Send
            </button>
        </form>
    )
} 