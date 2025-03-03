'use client'
import React from 'react'
import styles from './chat.module.scss'

export interface ChatListItemProps {
    id: string
    title: string
    subtitle?: string
    lastMessage?: string
    lastMessageTime?: string
    isSelected?: boolean
    isUnread?: boolean
    showAvatar?: boolean
    avatarUrl?: string
    onClick?: () => void
    className?: string
}

export default function ChatListItem({
    title,
    subtitle,
    lastMessage,
    lastMessageTime,
    isSelected = false,
    isUnread = false,
    showAvatar = false,
    avatarUrl,
    onClick,
    className = ''
}: ChatListItemProps) {
    return (
        <div
            className={`${styles.chatListItem} ${isSelected ? styles.selected : ''} ${isUnread ? styles.unread : ''} ${className}`}
            onClick={onClick}
        >
            {showAvatar && (
                <div className={styles.avatarContainer}>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={title} className={styles.avatar} />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            {title.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            )}
            <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                    <h4 className={styles.itemTitle}>{title}</h4>
                    {lastMessageTime && (
                        <span className={styles.messageTime}>{lastMessageTime}</span>
                    )}
                </div>
                {subtitle && <p className={styles.itemSubtitle}>{subtitle}</p>}
                {lastMessage && <p className={styles.messagePreview}>{lastMessage}</p>}
            </div>
        </div>
    )
}

// CSS classes to be included in the module that uses this component:
/*
.chat-list-item {
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, #2a2f35);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color, #1c1f26);
  }

  &.selected {
    background-color: var(--hover-color, #1c1f26);
  }

  &.unread {
    .item-title {
      font-weight: 600;
    }

    .message-preview {
      color: var(--text-color, #e2eaf1);
      font-weight: 500;
    }

    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--primary-color, #8364e2);
      margin-right: 12px;
      align-self: center;
    }
  }
}

.avatar-container {
  margin-right: 12px;
}

.avatar, .avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.avatar-placeholder {
  background-color: var(--hover-color, #2a2f35);
}

.item-info {
  flex: 1;
  min-width: 0; // Ensures text truncation works
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-subtitle {
  font-size: 14px;
  color: var(--text-secondary-color, #89939e);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.last-message {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-preview {
  font-size: 14px;
  color: var(--text-secondary-color, #69717b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.message-time {
  font-size: 12px;
  color: var(--text-secondary-color, #69717b);
  white-space: nowrap;
}
*/ 