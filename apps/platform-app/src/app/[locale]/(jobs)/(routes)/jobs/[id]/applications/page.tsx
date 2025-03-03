'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from './page.module.scss'
import { Button } from '@gdh/ui-system'
import { Applicant, Message } from './types'
import ApplicantItem from './components/ApplicantItem'
import MessageItem from './components/MessageItem'
import ChatInput from './components/ChatInput'
import Header from './components/Header'
import { I18nNamespaces } from '@/i18n/request'

// Mock data for applicants
const mockApplicants: Applicant[] = [
    {
        id: '1',
        name: 'Jakub Wąsowski',
        title: 'Senior Frontend Developer',
        lastMessage: 'Jak tam>',
        lastMessageTime: 'Just now',
        avatar: '/avatar-placeholder.png',
        messages: [
            {
                id: '1',
                sender: 'applicant',
                content: 'Was so great to see you!',
                timestamp: 'Sat, Apr 2, 9:41'
            },
            {
                id: '2',
                sender: 'recruiter',
                content: 'We should catch up soon!',
                timestamp: 'Yesterday, 9:41'
            },
            {
                id: '3',
                sender: 'applicant',
                content: 'Let\'s get lunch soon! When are you free? 🍕',
                timestamp: 'Today, 9:41'
            },
            {
                id: '4',
                sender: 'recruiter',
                content: 'I\'d love to see you!',
                timestamp: 'Read, 10:02'
            },
            {
                id: '5',
                sender: 'applicant',
                content: 'I\'m in. Let\'s do it! 12:30 tomorrow?',
                timestamp: 'Today, 9:41'
            },
            {
                id: '6',
                sender: 'recruiter',
                content: 'Siema!',
                timestamp: 'Just now'
            },
            {
                id: '7',
                sender: 'recruiter',
                content: 'Jak tam>',
                timestamp: 'Just now'
            }
        ]
    },
    {
        id: '2',
        name: 'Anna Kowalska',
        title: 'UX/UI Designer',
        lastMessage: 'Thanks for the opportunity!',
        lastMessageTime: 'Yesterday, 14:22',
        avatar: '/avatar-placeholder.png',
        messages: [
            {
                id: '1',
                sender: 'applicant',
                content: 'Thanks for the opportunity!',
                timestamp: 'Yesterday, 14:22'
            }
        ]
    },
    {
        id: '3',
        name: 'Piotr Nowak',
        title: 'Backend Developer',
        lastMessage: 'When can we schedule an interview?',
        lastMessageTime: '2 days ago',
        avatar: '/avatar-placeholder.png',
        messages: [
            {
                id: '1',
                sender: 'applicant',
                content: 'When can we schedule an interview?',
                timestamp: '2 days ago'
            }
        ]
    }
]

export default function JobApplicationsPage() {
    const params = useParams()
    const jobId = params.id as string
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant>(mockApplicants[0])
    const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const t = useTranslations(I18nNamespaces.Applications)

    // Scroll to bottom of messages when they change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [selectedApplicant.messages])

    const handleSendMessage = (messageText: string) => {
        // In a real app, you would send this to an API
        console.log('Sending message:', messageText)

        // For demo purposes, add the message to the UI
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'recruiter',
            content: messageText,
            timestamp: 'Just now'
        }

        // Update the selected applicant with the new message
        const updatedApplicant = {
            ...selectedApplicant,
            messages: [...selectedApplicant.messages, newMessage],
            lastMessage: messageText,
            lastMessageTime: 'Just now'
        }

        // Update the applicants list
        const updatedApplicants = applicants.map(applicant =>
            applicant.id === selectedApplicant.id ? updatedApplicant : applicant
        )

        // Update state
        setApplicants(updatedApplicants)
        setSelectedApplicant(updatedApplicant)
    }

    return (
        <div className={styles.pageWrapper}>
            <Header
                jobTitle="Senior Fronted Developer needed for a fintech project"
                jobStatus="PENDING"
                applicantCount={applicants.length}
                daysPublished={7}
            />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.applicantsList}>
                        {applicants.map((applicant) => (
                            <ApplicantItem
                                key={applicant.id}
                                applicant={applicant}
                                isSelected={selectedApplicant.id === applicant.id}
                                onClick={() => setSelectedApplicant(applicant)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.chatContainer}>
                    <div className={styles.chatHeader}>
                        <div className={styles.applicantProfile}>
                            <div className={styles.avatarPlaceholder}></div>
                            <div>
                                <div className={styles.applicantName}>{selectedApplicant.name}</div>
                                <div className={styles.applicantTitle}>{selectedApplicant.title}</div>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <Button variant="secondary">{t('viewProfile')}</Button>
                        </div>
                    </div>

                    <div className={styles.messagesContainer}>
                        {selectedApplicant.messages.map((message) => (
                            <MessageItem key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    )
}
