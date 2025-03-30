'use client'

import { addMessageToApplication } from '@/app/[locale]/(profile)/_actions/mutations'
import { useSSE } from '@/hooks/useSSE'
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
  // Reference to store IDs of messages that have already been added to the UI
  const processedMessages = useRef<Set<string>>(new Set())

  // Connect to SSE if we have a selected negotiation
  const { messages: sseMessages } = useSSE(selectedNegotiation?.id || '')

  // Process real-time messages
  useEffect(() => {
    if (!sseMessages.length || !selectedNegotiation) return

    // Get the latest message
    const latestMessage = sseMessages[sseMessages.length - 1]

    // Skip if this is a message from the current user or a connection event
    if (latestMessage.sender === 'user' || latestMessage.type === 'connected') return

    // Skip if we already processed this message ID
    if (processedMessages.current.has(latestMessage.id)) return

    // Add to processed messages
    processedMessages.current.add(latestMessage.id)

    // Create a new message object
    const newMessage: Message = {
      id: latestMessage.id,
      sender: 'company', // Since this is from the other party
      content: latestMessage.content,
      timestamp: new Date(latestMessage.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    }

    // Update the selected negotiation with the new message
    setSelectedNegotiation(prev => {
      if (!prev) return prev

      // Check if the message is already in the messages array
      const messageExists = prev.messages.some(m => m.id === newMessage.id)
      if (messageExists) return prev

      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage.content,
        lastMessageTime: newMessage.timestamp,
      }
    })

    // Update the negotiations list
    setNegotiations(prev =>
      prev.map(negotiation =>
        negotiation.id === selectedNegotiation.id
          ? {
            ...negotiation,
            lastMessage: newMessage.content,
            lastMessageTime: newMessage.timestamp,
            unread: true,
          }
          : negotiation
      )
    )
  }, [sseMessages, selectedNegotiation])

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedNegotiation?.messages])

  const handleSendMessage = async (messageText: string) => {
    if (!selectedNegotiation) return

    // Create a temporary ID for optimistic UI update
    const tempId = `temp-${Date.now()}`
    processedMessages.current.add(tempId)

    // Optimistically update UI
    const newMessage: Message = {
      id: tempId, // Use temporary ID
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

      if (result.success && result.message) {
        // Add the real message ID to the processed list
        processedMessages.current.add(result.message.id)
      } else if (!result.success) {
        console.error('Error sending message:', result.error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Revert the optimistic update in case of error
      // For a production app, we should add proper error handling
    }
  }

  // Clear processed messages if selected negotiation changes
  useEffect(() => {
    processedMessages.current.clear()
    // Pre-populate with existing message IDs
    if (selectedNegotiation?.messages) {
      selectedNegotiation.messages.forEach(msg => {
        processedMessages.current.add(msg.id)
      })
    }
  }, [selectedNegotiation?.id])

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
