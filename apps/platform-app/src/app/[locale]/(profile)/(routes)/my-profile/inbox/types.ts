import { type BaseChatItem, type BaseMessage } from '@/components/Chat'

export interface Message extends BaseMessage {
  sender: 'user' | 'company'
}

export interface JobNegotiation
  extends Omit<BaseChatItem, 'title' | 'subtitle'> {
  jobTitle: string
  companyName: string
  title: string // Same as jobTitle for compatibility
  subtitle: string // Same as companyName for compatibility
  unread: boolean
  messages: Message[]
}
