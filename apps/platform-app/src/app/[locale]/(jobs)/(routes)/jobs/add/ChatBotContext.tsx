'use client'

import React, { createContext, useContext, useRef } from 'react'
import { ChatBotState } from './ChatBotState'

interface JobApplicationChatContextType {
  chatBot: ChatBotState
}

const JobApplicationChatContext =
  createContext<JobApplicationChatContextType | null>(null)

export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chatBotRef = useRef(new ChatBotState())

  return (
    <JobApplicationChatContext.Provider value={{ chatBot: chatBotRef.current }}>
      {children}
    </JobApplicationChatContext.Provider>
  )
}

export const useJobApplicationChat = (): ChatBotState => {
  const context = useContext(JobApplicationChatContext)
  if (!context) {
    throw new Error('useChatBot must be used within a ChatBotProvider')
  }
  return context.chatBot
}
