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

// CSS classes to be included in the module that uses this component:
/*
.message-input-container {
  display: flex;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color, #2a2f35);
  margin-bottom: 0;
  background-color: var(--bg-color, #04080d);
}

.message-input {
  flex: 1;
  background-color: var(--hover-color, #1c1f26);
  border: 1px solid var(--border-color, #2a2f35);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-color, #e2eaf1);
  font-size: 16px;
  outline: none;
  height: 48px;

  &:focus {
    border-color: var(--primary-color, #8364e2);
  }

  &::placeholder {
    color: var(--text-secondary-color, #69717b);
  }
}

.send-button {
  margin-left: 12px;
  background-color: var(--primary-color, #8364e2);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 48px;

  &:hover {
    background-color: var(--primary-color-dark, #7050d0);
  }

  &:disabled {
    background-color: var(--hover-color, #1c1f26);
    cursor: not-allowed;
  }
}
*/
