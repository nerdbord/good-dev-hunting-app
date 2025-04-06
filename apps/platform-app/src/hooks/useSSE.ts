'use client'

import { useEffect, useState, useRef } from 'react'

export function useSSE(applicationId: string) {
    const [messages, setMessages] = useState<any[]>([])
    const [isConnected, setIsConnected] = useState(false)
    // Track processed message IDs to prevent duplicate processing
    const processedMessageIds = useRef<Set<string>>(new Set())

    useEffect(() => {
        if (!applicationId) return

        // Create EventSource for SSE
        const eventSource = new EventSource(
            `/api/messages/sse?applicationId=${applicationId}`
        )

        // Connection opened
        eventSource.onopen = () => {
            setIsConnected(true)
            console.log('SSE connection established')
        }

        // Handle incoming messages
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)

                // Handle different message types
                if (data.type === 'connected') {
                    console.log('Connected to real-time updates')
                } else if (data.applicationId === applicationId && data.id) {
                    // Check if we've already processed this message
                    if (!processedMessageIds.current.has(data.id)) {
                        // Mark as processed
                        processedMessageIds.current.add(data.id)
                        // Add the message to our local state
                        setMessages((prevMessages) => [...prevMessages, data])
                    }
                }
            } catch (error) {
                console.error('Error parsing SSE message:', error)
            }
        }

        // Handle errors
        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error)
            setIsConnected(false)
            eventSource.close()
        }

        // Clean up on unmount
        return () => {
            eventSource.close()
        }
    }, [applicationId])

    return { messages, isConnected }
} 