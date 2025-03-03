export { default as ChatContainer } from './ChatContainer'
export { default as ChatInput } from './ChatInput'
export { default as ChatListItem } from './ChatListItem'
export { default as Message } from './Message'

export type { ChatContainerProps } from './ChatContainer'
export type { ChatInputProps } from './ChatInput'
export type { ChatListItemProps } from './ChatListItem'
export type { MessageProps } from './Message'

// Common types that can be extended by specific implementations
export interface BaseMessage {
  id: string
  content: string
  timestamp: string
}

export interface BaseChatItem {
  id: string
  title: string
  subtitle: string
  lastMessage: string
  lastMessageTime: string
}
