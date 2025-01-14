'use client'

import React, { createContext, useContext, useRef } from 'react'
import { ChatBotState } from './ChatBotState'

interface ChatBotContextType {
  chatBot: ChatBotState
}

const ChatBotContext = createContext<ChatBotContextType | null>(null)

export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chatBotRef = useRef(new ChatBotState())

  return (
    <ChatBotContext.Provider value={{ chatBot: chatBotRef.current }}>
      {children}
    </ChatBotContext.Provider>
  )
}

export const useChatBot = (): ChatBotState => {
  const context = useContext(ChatBotContext)
  if (!context) {
    throw new Error('useChatBot must be used within a ChatBotProvider')
  }
  return context.chatBot
}
