import { type BaseChatItem, type BaseMessage } from '@/components/Chat'

export interface Message extends BaseMessage {
  sender: 'applicant' | 'recruiter'
}

export interface Applicant extends Omit<BaseChatItem, 'title' | 'subtitle'> {
  name: string
  title: string
  avatar: string
  messages: Message[]
}
