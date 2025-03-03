'use client'
import { type ReactNode } from 'react'
import styles from './chat.module.scss'

export interface ChatContainerProps {
  sidebarContent: ReactNode
  headerContent: ReactNode
  messagesContent: ReactNode
  inputContent: ReactNode
  sidebarClassName?: string
  mainClassName?: string
  headerClassName?: string
  messagesClassName?: string
  inputClassName?: string
  className?: string
}

export default function ChatContainer({
  sidebarContent,
  headerContent,
  messagesContent,
  inputContent,
  sidebarClassName = '',
  mainClassName = '',
  headerClassName = '',
  messagesClassName = '',
  inputClassName = '',
  className = '',
}: ChatContainerProps) {
  return (
    <div className={`${styles.chatContainer} ${className}`}>
      <div className={`${styles.chatSidebar} ${sidebarClassName}`}>
        {sidebarContent}
      </div>
      <div className={`${styles.chatMain} ${mainClassName}`}>
        <div className={`${styles.chatHeader} ${headerClassName}`}>
          {headerContent}
        </div>
        <div className={`${styles.chatMessages} ${messagesClassName}`}>
          {messagesContent}
        </div>
        <div className={inputClassName}>{inputContent}</div>
      </div>
    </div>
  )
}

// CSS classes to be included in the module that uses this component:
/*
.chat-container {
  display: flex;
  height: calc(100vh - 200px);
  background-color: var(--bg-color, #04080d);
  color: var(--text-color, #e2eaf1);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color, #2a2f35);
}

.chat-sidebar {
  width: 320px;
  border-right: 1px solid var(--border-color, #2a2f35);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color, #0f1217);
  overflow-y: auto;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color, #04080d);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color, #2a2f35);
}

.chat-messages {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-input {
  border-top: 1px solid var(--border-color, #2a2f35);
}

// Mobile responsiveness
@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
    height: auto;
  }

  .chat-sidebar, 
  .chat-main {
    width: 100%;
  }

  .chat-sidebar {
    height: 50%;
    border-right: none;
    border-bottom: 1px solid var(--border-color, #2a2f35);
  }

  .chat-messages {
    height: 50vh;
  }
}
*/
