/* eslint-disable */
// Define types for global message listeners
declare global {
  type MessageHandler = (message: {
    applicationId: string
    id: string
    content: string
    timestamp: string
    senderId: string
    sender: string
  }) => void
  var messageListeners: Map<string, Set<MessageHandler>> | undefined
}

export {}
