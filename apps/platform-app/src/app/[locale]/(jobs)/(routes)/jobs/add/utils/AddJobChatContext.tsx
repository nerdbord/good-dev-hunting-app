'use client'

import React, { createContext, useContext, useRef } from 'react'
import { ChatBotState } from './AddJobChatState'

interface AddJobChatContextType {
  chatBot: ChatBotState
}

const AddJobChatContext = createContext<AddJobChatContextType | null>(null)

export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chatBotRef = useRef(new ChatBotState())

  return (
    <AddJobChatContext.Provider value={{ chatBot: chatBotRef.current }}>
      {children}
    </AddJobChatContext.Provider>
  )
}

export const useAddJobChat = (): ChatBotState => {
  const context = useContext(AddJobChatContext)
  if (!context) {
    throw new Error('useChatBot must be used within a ChatBotProvider')
  }
  return context.chatBot
}
