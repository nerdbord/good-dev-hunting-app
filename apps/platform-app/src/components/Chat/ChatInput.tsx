'use client'
import React, { useState } from 'react'
import styles from './chat.module.scss'

export interface ChatInputProps {
  onSendMessage: (message: string) => void
  placeholder?: string
  buttonText?: string
  className?: string
}

export default function ChatInput({
  onSendMessage,
  placeholder = 'Type a message...',
  buttonText = 'Send',
  className = '',
}: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.chatInput} ${className}`}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className={styles.chatInputField}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={styles.chatInputButton}
      >
        {buttonText}
      </button>
    </form>
  )
}
