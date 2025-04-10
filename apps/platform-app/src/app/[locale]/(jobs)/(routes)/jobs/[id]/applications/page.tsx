'use client'
import { addRecruiterMessage } from '@/app/[locale]/(jobs)/_actions/mutations'
import { getJobApplications } from '@/app/[locale]/(jobs)/_actions/queries/getJobApplications'
import { findJobById } from '@/app/[locale]/(jobs)/_actions/queries/getJobById'
import {
  ChatContainer,
  ChatInput,
  ChatListItem,
  Message as MessageComponent,
} from '@/components/Chat'
import chatStyles from '@/components/Chat/chat.module.scss'
import { AdvancedLoader } from '@/components/Loader'
import { useSSE } from '@/hooks/useSSE'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import styles from './page.module.scss'
import { type Applicant, type Message } from './types'

export default function JobApplicationsPage() {
  const params = useParams()
  const jobId = params.id as string
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  )
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState<{
    title: string
    status: PublishingState
    createdAt: Date
  } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = useTranslations(I18nNamespaces.Applications)
  // Reference to store IDs of messages that have already been added to the UI
  const processedMessages = useRef<Set<string>>(new Set())

  // Connect to SSE if we have a selected applicant
  const { messages: sseMessages } = useSSE(selectedApplicant?.id || '')

  // Load job data and applications
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Load job data
        const jobData = await findJobById(jobId)
        if (jobData) {
          setJob({
            title: jobData.jobName,
            status: jobData.state,
            createdAt: new Date(jobData.createdAt),
          })
        }

        // Load applications
        const applications = await getJobApplications(jobId)

        // Map the server data to the Applicant type expected by the UI
        const mappedApplicants: Applicant[] = applications.map((app) => ({
          id: app.id,
          name: app.name,
          title: app.title,
          lastMessage: app.lastMessage,
          lastMessageTime: app.lastMessageTime,
          avatar: app.avatar,
          messages: app.messages.map((msg) => ({
            id: msg.id,
            sender: msg.sender,
            content: msg.content,
            timestamp: msg.timestamp,
          })),
        }))

        setApplicants(mappedApplicants)

        // Set the first applicant as selected if we have any
        if (mappedApplicants.length > 0 && !selectedApplicant) {
          setSelectedApplicant(mappedApplicants[0])
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [jobId])

  // Process real-time messages
  useEffect(() => {
    if (!sseMessages.length || !selectedApplicant) return

    // Get the latest message
    const latestMessage = sseMessages[sseMessages.length - 1]

    // Skip if this is a message from the recruiter or a connection event
    if (
      latestMessage.sender === 'recruiter' ||
      latestMessage.type === 'connected'
    )
      return

    // Skip if we already processed this message ID
    if (processedMessages.current.has(latestMessage.id)) return

    // Add to processed messages
    processedMessages.current.add(latestMessage.id)

    // Create a new message object
    const newMessage: Message = {
      id: latestMessage.id,
      sender: 'applicant', // Since this is from the applicant
      content: latestMessage.content,
      timestamp: new Date(latestMessage.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    }

    // Update the selected applicant with the new message
    setSelectedApplicant((prev) => {
      if (!prev) return prev

      // Check if the message is already in the messages array
      const messageExists = prev.messages.some((m) => m.id === newMessage.id)
      if (messageExists) return prev

      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage.content,
        lastMessageTime: newMessage.timestamp,
      }
    })

    // Update the applicants list
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

  // Clear processed messages if selected applicant changes
  useEffect(() => {
    processedMessages.current.clear()
    // Pre-populate with existing message IDs
    if (selectedApplicant?.messages) {
      selectedApplicant.messages.forEach((msg) => {
        processedMessages.current.add(msg.id)
      })
    }
  }, [selectedApplicant?.id])

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedApplicant?.messages])

  const handleSendMessage = async (messageText: string) => {
    if (!selectedApplicant) return

    // Create a temporary ID for optimistic UI update
    const tempId = `temp-${Date.now()}`
    processedMessages.current.add(tempId)

    // For optimistic UI update
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

    // Update the selected applicant with the new message
    const updatedApplicant = {
      ...selectedApplicant,
      messages: [...selectedApplicant.messages, newMessage],
      lastMessage: messageText,
      lastMessageTime: newMessage.timestamp,
    }

    // Update the applicants list
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === selectedApplicant.id ? updatedApplicant : applicant,
    )

    // Update state for immediate feedback
    setApplicants(updatedApplicants)
    setSelectedApplicant(updatedApplicant)

    try {
      // Actually send the message using our server action
      const result = await addRecruiterMessage(
        selectedApplicant.id,
        messageText,
      )

      if (result.success && result.message) {
        // Add the real message ID to the processed list
        processedMessages.current.add(result.message.id)
      } else if (!result.success) {
        console.error('Error sending message:', result.error)
        // In a production app, we would handle this error better
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // Render the sidebar content with applicant items
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
            onClick={() => setSelectedApplicant(applicant)}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>{t('noApplications')}</p>
        </div>
      )}
    </div>
  )

  // Render the header content
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

  // Render the messages content
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

  // Render the input content
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

  // Helper function to calculate days published
  const getDaysPublished = () => {
    if (!job) return 0
    const diffTime = Math.abs(new Date().getTime() - job.createdAt.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Convert job status to header component expected format
  const convertJobStatus = (): 'PENDING' | 'ACTIVE' | 'CLOSED' => {
    if (!job) return 'PENDING'

    switch (job.status) {
      case PublishingState.APPROVED:
        return 'ACTIVE'
      case PublishingState.PENDING:
      case PublishingState.DRAFT:
        return 'PENDING'
      case PublishingState.REJECTED:
        return 'CLOSED'
      default:
        return 'PENDING'
    }
  }

  if (loading) {
    return <AdvancedLoader message={t('loading')} />
  }

  return (
    <div className={styles.pageWrapper}>
      <Header
        jobTitle={job?.title || 'Loading...'}
        jobStatus={convertJobStatus()}
        applicantCount={applicants.length}
        daysPublished={getDaysPublished()}
      />
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
    </div>
  )
}
