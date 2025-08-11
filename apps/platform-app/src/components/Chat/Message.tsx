'use client'
import { parseMessageContent } from '@/utils/messageParser'
import styles from './chat.module.scss'

export interface MessageProps {
  id: string
  content: string
  timestamp: string
  isSentByCurrentUser: boolean
  className?: string
}

export default function Message({
  content,
  timestamp,
  isSentByCurrentUser,
  className = '',
}: MessageProps) {
  return (
    <div
      className={`${styles.messageItem} ${
        isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage
      } ${className}`}
      style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column' }}
    >
      <div
        className={styles.messageContent}
        style={{
          borderRadius: isSentByCurrentUser
            ? '16px 16px 0 16px'
            : '16px 16px 16px 0',
          padding: '12px 16px',
          fontSize: '16px',
          lineHeight: 1.4,
        }}
      >
        {parseMessageContent(content)}
      </div>
      <div
        className={styles.messageTimestamp}
        style={{
          alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
          margin: isSentByCurrentUser ? '4px 4px 0 0' : '4px 0 0 4px',
          fontSize: '12px',
          color: 'var(--text-color3)',
        }}
      >
        {timestamp}
      </div>
    </div>
  )
}

// CSS classes to be included in the module that uses this component:
/*
.message-item {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.sent-message {
  align-self: flex-end;

  .message-content {
    background-color: var(--primary-color, #8364e2);
    border-radius: 16px 16px 0 16px;
    color: white;
  }

  .message-timestamp {
    align-self: flex-end;
    margin-right: 4px;
  }
}

.received-message {
  align-self: flex-start;

  .message-content {
    background-color: var(--hover-color, #1c1f26);
    border-radius: 16px 16px 16px 0;
  }

  .message-timestamp {
    align-self: flex-start;
    margin-left: 4px;
  }
}

.message-content {
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.4;
}

.message-timestamp {
  font-size: 12px;
  color: var(--text-secondary-color, #69717b);
  margin-top: 4px;
}
*/
