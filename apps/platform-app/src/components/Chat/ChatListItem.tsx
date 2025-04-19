'use client'
import Image from 'next/image'
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
  className = '',
}: ChatListItemProps) {
  return (
    //
    <div
      className={`${styles.chatListItem} ${isSelected ? styles.selected : ''} ${
        isUnread ? styles.unread : ''
      } ${className}`}
      onClick={onClick}
    >
      {showAvatar && (
        <div className={styles.avatarContainer}>
          {avatarUrl ? (
            <Image src={avatarUrl} alt={title} className={styles.avatar} />
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
