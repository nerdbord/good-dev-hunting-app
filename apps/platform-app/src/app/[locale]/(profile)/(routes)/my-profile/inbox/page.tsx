'use client'
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
import Header from './components/Header'
import styles from './page.module.scss'
import type { JobNegotiation, Message } from './types'

// Mock data for job negotiations
const mockNegotiations: JobNegotiation[] = [
  {
    id: '1',
    jobTitle: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    title: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    companyName: 'FinTech Solutions',
    subtitle: 'FinTech Solutions',
    lastMessage: 'Kilka słów z ostatniej wiadomości, wyświetlonych...',
    lastMessageTime: '3 dni temu',
    unread: true,
    messages: [
      {
        id: '1',
        sender: 'company',
        content:
          "Hi there! We've reviewed your application and we're impressed with your skills.",
        timestamp: '3 days ago',
      },
      {
        id: '2',
        sender: 'user',
        content: "Thank you! I'm excited about the opportunity.",
        timestamp: '2 days ago',
      },
      {
        id: '3',
        sender: 'company',
        content: 'We should catch up soon!',
        timestamp: 'Yesterday, 9:41',
      },
      {
        id: '4',
        sender: 'user',
        content: "I'd love to! When works for you?",
        timestamp: 'Yesterday, 14:22',
      },
      {
        id: '5',
        sender: 'company',
        content: "Let's get lunch soon! When are you free?",
        timestamp: 'Today, 9:41',
      },
    ],
  },
  {
    id: '2',
    jobTitle: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    title: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    companyName: 'ShopEasy',
    subtitle: 'ShopEasy',
    lastMessage: 'Kilka słów z ostatniej wiadomości, wyświetlonych...',
    lastMessageTime: '3 dni temu',
    unread: false,
    messages: [
      {
        id: '1',
        sender: 'company',
        content: 'Thanks for applying to our position.',
        timestamp: '4 days ago',
      },
      {
        id: '2',
        sender: 'company',
        content: "We'd like to schedule an interview with you.",
        timestamp: 'Yesterday, 14:22',
      },
    ],
  },
  {
    id: '3',
    jobTitle: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    title: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    companyName: 'CloudSoft',
    subtitle: 'CloudSoft',
    lastMessage: 'Kilka słów z ostatniej wiadomości, wyświetlonych...',
    lastMessageTime: '3 dni temu',
    unread: false,
    messages: [
      {
        id: '1',
        sender: 'company',
        content: "We've received your application.",
        timestamp: '1 week ago',
      },
      {
        id: '2',
        sender: 'user',
        content: 'Great! Looking forward to hearing back.',
        timestamp: '6 days ago',
      },
      {
        id: '3',
        sender: 'company',
        content: "We'd like you to complete a technical assessment.",
        timestamp: '5 days ago',
      },
      {
        id: '4',
        sender: 'user',
        content: "I've completed the assessment.",
        timestamp: '3 days ago',
      },
      {
        id: '5',
        sender: 'company',
        content: 'Your technical assessment results look great!',
        timestamp: '2 days ago',
      },
    ],
  },
  {
    id: '4',
    jobTitle: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    title: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    companyName: 'TechInnovate',
    subtitle: 'TechInnovate',
    lastMessage: 'Kilka słów z ostatniej wiadomości, wyświetlonych...',
    lastMessageTime: '3 dni temu',
    unread: false,
    messages: [
      {
        id: '1',
        sender: 'company',
        content: "We've received your application.",
        timestamp: '1 week ago',
      },
      {
        id: '2',
        sender: 'user',
        content: 'Great! Looking forward to hearing back.',
        timestamp: '6 days ago',
      },
      {
        id: '3',
        sender: 'company',
        content: 'We should catch up soon!',
        timestamp: 'Yesterday, 9:41',
      },
      {
        id: '4',
        sender: 'user',
        content: "I'm in. Let's do it! 12:30 tomorrow?",
        timestamp: 'Today, 9:41',
      },
    ],
  },
  {
    id: '5',
    jobTitle: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    title: 'Pomoc w zaprojektowaniu i developmencie strony wizytówki',
    companyName: 'DevStudio',
    subtitle: 'DevStudio',
    lastMessage: 'Kilka słów z ostatniej wiadomości, wyświetlonych...',
    lastMessageTime: '3 dni temu',
    unread: false,
    messages: [
      {
        id: '1',
        sender: 'company',
        content: "We've received your application.",
        timestamp: '1 week ago',
      },
      {
        id: '2',
        sender: 'user',
        content: 'Great! Looking forward to hearing back.',
        timestamp: '6 days ago',
      },
    ],
  },
]

export default function InboxPage() {
  const t = useTranslations(I18nNamespaces.Inbox)
  const [negotiations, setNegotiations] =
    useState<JobNegotiation[]>(mockNegotiations)
  const [selectedNegotiation, setSelectedNegotiation] =
    useState<JobNegotiation | null>(mockNegotiations[0])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedNegotiation?.messages])

  const handleSendMessage = (messageText: string) => {
    if (!selectedNegotiation) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageText,
      timestamp: t('today'),
    }

    // Update the selected negotiation with the new message
    const updatedNegotiation = {
      ...selectedNegotiation,
      messages: [...selectedNegotiation.messages, newMessage],
      lastMessage: messageText,
      lastMessageTime: t('today'),
    }

    // Update the negotiations list
    const updatedNegotiations = negotiations.map((negotiation) =>
      negotiation.id === selectedNegotiation.id
        ? updatedNegotiation
        : negotiation,
    )

    // Update state
    setNegotiations(updatedNegotiations)
    setSelectedNegotiation(updatedNegotiation)

    // In a real app, you would send this to an API
    console.log('Sending message:', messageText)
  }

  // Render the sidebar content with negotiation items
  const renderSidebarContent = () => (
    <div className={styles.negotiationsList}>
      {negotiations.length > 0 ? (
        negotiations.map((negotiation) => (
          <ChatListItem
            key={negotiation.id}
            id={negotiation.id}
            title={negotiation.jobTitle}
            subtitle={negotiation.companyName}
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
