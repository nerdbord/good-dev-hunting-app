/**
 * Represents a message in a job application conversation
 */
export interface Message {
  id: string
  content: string
  timestamp: string
  sender: 'user' | 'company'
}

/**
 * Represents a job application conversation
 * Compatible with the chat components in the UI
 */
export interface JobNegotiation {
  id: string
  jobId: string
  jobTitle: string
  companyName: string
  title: string // For compatibility with ChatListItem
  subtitle: string // For compatibility with ChatListItem
  lastMessage: string
  lastMessageTime: string
  unread: boolean
  messages: Message[]
}
