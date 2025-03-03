export interface Message {
    id: string;
    sender: 'user' | 'company';
    content: string;
    timestamp: string;
}

export interface JobNegotiation {
    id: string;
    jobTitle: string;
    companyName: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: boolean;
    messages: Message[];
} 