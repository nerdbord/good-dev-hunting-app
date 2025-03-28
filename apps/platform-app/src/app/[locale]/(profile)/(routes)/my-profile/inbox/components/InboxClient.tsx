'use client'

import { addMessageToApplication } from '@/app/[locale]/(profile)/_actions/mutations'
import {
  ChatContainer,
  ChatInput,
  ChatListItem,
  Message as MessageComponent,
} from '@/components/Chat'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '../page.module.scss'
import { type JobNegotiation, type Message } from '../types'
import Header from './Header'

// Client component for interactive elements
export default function InboxClient({
  initialApplications,
}: {
  initialApplications: JobNegotiation[]
}) {
  const t = useTranslations(I18nNamespaces.Inbox)
  const [negotiations, setNegotiations] =
    useState<JobNegotiation[]>(initialApplications)
  const [selectedNegotiation, setSelectedNegotiation] =
    useState<JobNegotiation | null>(
      initialApplications.length > 0 ? initialApplications[0] : null,
    )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedNegotiation?.messages])

  const handleSendMessage = async (messageText: string) => {
    if (!selectedNegotiation) return

    // Optimistically update UI
    const newMessage: Message = {
      id: Date.now().toString(), // Temp ID
      sender: 'user',
      content: messageText,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    }

    // Update the selected negotiation with the new message
    const updatedNegotiation = {
      ...selectedNegotiation,
      messages: [...selectedNegotiation.messages, newMessage],
      lastMessage: messageText,
      lastMessageTime: newMessage.timestamp,
    }

    // Update the negotiations list
    const updatedNegotiations = negotiations.map((negotiation) =>
      negotiation.id === selectedNegotiation.id
        ? updatedNegotiation
        : negotiation,
    )

    // Update state immediately for responsiveness
    setNegotiations(updatedNegotiations)
    setSelectedNegotiation(updatedNegotiation)

    try {
      // Send the message using the server action
      const result = await addMessageToApplication(
        selectedNegotiation.id,
        messageText,
      )

      if (!result.success) {
        console.error('Error sending message:', result.error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Revert the optimistic update in case of error
      // For a production app, we should add proper error handling
    }
  }

  // Render the sidebar content with negotiation items
  const renderSidebarContent = () => (
    <div className={styles.negotiationsList}>
      {negotiations.length > 0 ? (
        negotiations.map((negotiation) => (
          <ChatListItem
            key={negotiation.id}
            id={negotiation.id}
            title={negotiation.title}
            subtitle={negotiation.subtitle}
            lastMessage={negotiation.lastMessage}
            lastMessageTime={negotiation.lastMessageTime}
            isSelected={selectedNegotiation?.id === negotiation.id}
            isUnread={negotiation.unread}
            onClick={() => setSelectedNegotiation(negotiation)}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>{t('noNegotiations')}</p>
          <p>{t('noNegotiationsSubtitle')}</p>
        </div>
      )}
    </div>
  )

  // Render the header content
  const renderHeaderContent = () =>
    selectedNegotiation ? <Header negotiation={selectedNegotiation} /> : null

  // Render the messages content
  const renderMessagesContent = () =>
    selectedNegotiation ? (
      <>
        {selectedNegotiation.messages.map((message) => (
          <MessageComponent
            key={message.id}
            id={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isSentByCurrentUser={message.sender === 'user'}
          />
        ))}
        <div ref={messagesEndRef} />
      </>
    ) : (
      <div className={styles.emptyState}>
        <p>{t('noSelectedNegotiation')}</p>
      </div>
    )

  // Render the input content
  const renderInputContent = () =>
    selectedNegotiation ? (
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder={t('typeMessage')}
        buttonText={t('send')}
      />
    ) : null

  return (
    <div className={styles.container}>
      <Link href={AppRoutes.myProfile} className={styles.backLink}>
        ← {t('backToProfile')}
      </Link>

      <h1 className={styles.pageTitle}>{t('title')}</h1>
      <p className={styles.pageSubtitle}>{t('subtitle')}</p>

      <ChatContainer
        sidebarContent={renderSidebarContent()}
        headerContent={renderHeaderContent()}
        messagesContent={renderMessagesContent()}
        inputContent={renderInputContent()}
        className={styles.inboxContainer}
        sidebarClassName={styles.sidebar}
        messagesClassName={styles.messagesContainer}
        inputClassName={styles.inputContainer}
      />
    </div>
  )
}
