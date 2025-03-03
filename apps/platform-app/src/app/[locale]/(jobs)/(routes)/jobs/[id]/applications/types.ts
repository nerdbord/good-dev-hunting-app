export interface Message {
    id: string;
    sender: 'applicant' | 'recruiter';
    content: string;
    timestamp: string;
}

export interface Applicant {
    id: string;
    name: string;
    title: string;
    lastMessage: string;
    lastMessageTime: string;
    avatar: string;
    messages: Message[];
} 