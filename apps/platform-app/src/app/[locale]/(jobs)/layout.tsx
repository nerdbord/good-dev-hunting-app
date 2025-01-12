import HunterHeader from '@/components/hunter-landing/HunterHeader/HunterHeader'
import { Container } from '@gdh/ui-system'
import React from 'react'
import { ChatBotProvider } from './(routes)/jobs/add/ChatBotContext'

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <ChatBotProvider>
        <Container>
          <HunterHeader />
          {children}
        </Container>
      </ChatBotProvider>
    </main>
  )
}
