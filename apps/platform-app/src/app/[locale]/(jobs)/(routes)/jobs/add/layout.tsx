import React from 'react'
import { ChatBotProvider } from '../../../(routes)/jobs/add/ChatBotContext'

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChatBotProvider>{children}</ChatBotProvider>
}
