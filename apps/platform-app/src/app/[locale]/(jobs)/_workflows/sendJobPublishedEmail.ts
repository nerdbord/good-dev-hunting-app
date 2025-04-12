// Re-export the sendJobPublishedEmail function from the mailing service
export { sendJobPublishedEmail } from '@/backend/mailing/mailing.service'

// Export the AuthUser type for compatibility
export interface AuthUser {
  id: string
  email: string
  avatarUrl?: string | null
  name?: string | null
  roles: string[]
  profileId?: string | null
  githubUsername?: string | null
  profileSlug?: string | null
}
