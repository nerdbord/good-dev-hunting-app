'use client'

import { addRecruiterMessage } from '@/app/[locale]/(jobs)/_actions/mutations'
import {
  ChatContainer,
  ChatInput,
  ChatListItem,
  Message as MessageComponent,
} from '@/components/Chat'
import chatStyles from '@/components/Chat/chat.module.scss'
import { useSSE } from '@/hooks/useSSE'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../page.module.scss'
import { type Applicant, type Message } from '../types'

interface JobApplicationsClientProps {
  jobId: string
  initialApplicants: Applicant[]
  initialSelectedApplicant: Applicant | null
}

export default function JobApplicationsClient({
  jobId,
  initialApplicants,
  initialSelectedApplicant,
}: JobApplicationsClientProps) {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    initialSelectedApplicant,
  )
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = useTranslations(I18nNamespaces.Applications)
  const processedMessages = useRef<Set<string>>(new Set())

  const { messages: sseMessages } = useSSE(selectedApplicant?.id || '')

  useEffect(() => {
    if (!sseMessages.length || !selectedApplicant) return

    const latestMessage = sseMessages[sseMessages.length - 1]

    if (
      latestMessage.sender === 'recruiter' ||
      latestMessage.type === 'connected'
    )
      return
    if (processedMessages.current.has(latestMessage.id)) return

    processedMessages.current.add(latestMessage.id)

    const newMessage: Message = {
      id: latestMessage.id,
      sender: 'applicant',
      content: latestMessage.content,
      timestamp: new Date(latestMessage.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    }

    setSelectedApplicant((prev) => {
      if (!prev) return prev
      const messageExists = prev.messages.some((m) => m.id === newMessage.id)
      if (messageExists) return prev
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage.content,
        lastMessageTime: newMessage.timestamp,
      }
    })

    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === selectedApplicant.id
          ? {
              ...applicant,
              lastMessage: newMessage.content,
              lastMessageTime: newMessage.timestamp,
            }
          : applicant,
      ),
    )
  }, [sseMessages, selectedApplicant])

  useEffect(() => {
    processedMessages.current.clear()
    if (selectedApplicant?.messages) {
      selectedApplicant.messages.forEach((msg) => {
        processedMessages.current.add(msg.id)
      })
    }
  }, [selectedApplicant?.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedApplicant?.messages])

  const handleSendMessage = async (messageText: string) => {
    if (!selectedApplicant) return

    const tempId = `temp-${Date.now()}`
    processedMessages.current.add(tempId)

    const newMessage: Message = {
      id: tempId,
      sender: 'recruiter',
      content: messageText,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    }

    const updatedApplicant = {
      ...selectedApplicant,
      messages: [...selectedApplicant.messages, newMessage],
      lastMessage: messageText,
      lastMessageTime: newMessage.timestamp,
    }
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === selectedApplicant.id ? updatedApplicant : applicant,
    )
    setApplicants(updatedApplicants)
    setSelectedApplicant(updatedApplicant)

    try {
      const result = await addRecruiterMessage(
        selectedApplicant.id,
        messageText,
      )
      if (result.success && result.message) {
        processedMessages.current.add(result.message.id)
      } else if (!result.success) {
        console.error('Error sending message:', result.error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const renderSidebarContent = () => (
    <div className={styles.applicantsList}>
      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <ChatListItem
            key={applicant.id}
            id={applicant.id}
            title={applicant.name}
            subtitle={applicant.title}
            lastMessage={applicant.lastMessage}
            lastMessageTime={applicant.lastMessageTime}
            isSelected={selectedApplicant?.id === applicant.id}
            showAvatar={true}
            avatarUrl={applicant.avatar}
            onClick={() => {
              const newSelected = applicants.find((a) => a.id === applicant.id)
              if (newSelected) {
                setSelectedApplicant(newSelected)
              }
            }}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>{t('noApplications')}</p>
        </div>
      )}
    </div>
  )

  const renderHeaderContent = () => {
    if (!selectedApplicant) return null
    return (
      <div className={styles.chatHeader}>
        <div className={styles.applicantProfile}>
          <div className={styles.avatarPlaceholder}>
            <Image
              width={40}
              height={40}
              src={selectedApplicant.avatar}
              alt={selectedApplicant.name}
              className={styles.avatar}
            />
          </div>
          <div>
            <div className={styles.applicantName}>{selectedApplicant.name}</div>
            <div className={styles.applicantTitle}>
              {selectedApplicant.title}
            </div>
          </div>
        </div>
        <div className={`${styles.headerActions} ${chatStyles.headerActions}`}>
          <Button variant="secondary">{t('viewProfile')}</Button>
        </div>
      </div>
    )
  }

  const renderMessagesContent = () => {
    if (!selectedApplicant) return null
    return (
      <>
        {selectedApplicant.messages.map((message) => (
          <MessageComponent
            key={message.id}
            id={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isSentByCurrentUser={message.sender === 'recruiter'}
          />
        ))}
        <div ref={messagesEndRef} />
      </>
    )
  }

  const renderInputContent = () => {
    if (!selectedApplicant) return null
    return (
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder={t('typeMessage')}
        buttonText={t('send')}
      />
    )
  }

  return (
    <ChatContainer
      sidebarContent={renderSidebarContent()}
      headerContent={renderHeaderContent()}
      messagesContent={renderMessagesContent()}
      inputContent={renderInputContent()}
      className={styles.container}
      sidebarClassName={styles.sidebar}
      messagesClassName={styles.messagesContainer}
      inputClassName={styles.inputContainer}
    />
  )
}
